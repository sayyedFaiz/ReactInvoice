import Invoice from "../models/InvoiceModel.js";
import dotenv from "dotenv";
import Tesseract from "tesseract.js";

dotenv.config();

// Ollama local LLM - no API limits, runs entirely on your machine
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";


export const createInvoice = async (req, res) => {
  console.log("Creating invoice...");
  console.log("Request body:", req.body); // <--- check what mobile is sending
  try {
    const invoice = new Invoice({
      ...req.body.invoiceData,
    });
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(400).json({ message: error.message });
  }
};

export const inputValidation = async (req, res) => {
  console.log("Request body:", req.body); // <--- check what mobile is sending

  try {
    const existingInvoiceNumber = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    if (existingInvoiceNumber) {
      console.log("Invoice number already exists");
      return res
        .status(409)
        .json({ message: "Invoice number already exists", exists: true });
    } else {
      console.log("Invoice number is unique");
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking invoice number:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllInvoice = async (req, res) => {
  try {
    const allInvoice = await Invoice.find().sort({ invoiceNumber: -1 });
    res.status(200).json(allInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const id = req.params;
    // console.log(id)
    const invoice = await Invoice.findById(id.id);
    res.status(200).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.error("Failed to get invoice by id : ", { error: err.message });
  }
};

export const getNextInvoiceNumber = async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
    const nextInvoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;
    res.json({ nextInvoiceNumber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findByIdAndDelete(id);
    res.status(200).json(invoice);
  } catch (err) {
    console.error("Error deleting invoice : ", err);
  }
};

export const extractInvoiceDetails = async (req, res) => {
  try {
    console.log("Extracting invoice details...");

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    console.log(`File received: ${req.file.originalname}, Size: ${req.file.size}, Mime: ${req.file.mimetype}`);

    // Step 1: Extract text from image using OCR (Tesseract.js)
    console.log("Step 1: Extracting text from image using OCR (Tesseract.js)...");

    let extractedText;
    try {
      const { data: { text } } = await Tesseract.recognize(
        req.file.buffer,
        'eng', // English language
        {
          logger: (info) => {
            if (info.status === 'recognizing text') {
              console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
            }
          }
        }
      );

      extractedText = text;
      console.log("OCR extraction completed. Text length:", extractedText.length);
      console.log("Extracted text preview:", extractedText.substring(0, 200) + "...");

      if (!extractedText || extractedText.trim().length === 0) {
        return res.status(400).json({
          message: "Could not extract text from image",
          error: "OCR returned empty text. Please ensure the image is clear and contains readable text."
        });
      }
    } catch (ocrError) {
      console.error("OCR Error:", ocrError);
      return res.status(500).json({
        message: "Failed to extract text from image",
        error: ocrError.message,
        suggestion: "Please ensure the image is clear and contains readable text."
      });
    }

    // Step 2: Send extracted text to Ollama for structured data extraction
    console.log(`Step 2: Sending extracted text to Ollama (${OLLAMA_MODEL}) for structured extraction...`);

    const prompt = `Extract the following details from this invoice text and return them in a strict JSON format. Do not include markdown formatting (like \`\`\`json).

Invoice Text:
${extractedText}

Fields to extract:
- invoiceNumber (string)
- date (YYYY-MM-DD format)
- customerName (string)
- customerDetails (object with name, address, gst, etc.)
- items (array of objects with name, quantity, price, hsn, amount)

If a field is not found, use null or empty string.
Ensure numeric values are numbers, not strings.
Return ONLY valid JSON, no additional text.`;

    // Ollama models - try primary then fallback
    const models = [
      OLLAMA_MODEL,       // Primary model from env (default: llama3.2:3b)
      "mistral:7b",       // Fallback: stronger reasoning
    ];

    let lastError = null;

    // Try each model until one works
    for (const model of models) {
      try {
        console.log(`Trying Ollama model: ${model}...`);

        const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            stream: false,
            options: {
              temperature: 0.1, // Lower temperature for more consistent JSON output
              num_predict: 2000,
            },
            format: "json", // Force JSON response
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          // If model not found, try next one
          if (response.status === 404 || errText.includes("not found")) {
            console.log(`Model ${model} not found. Trying next model...`);
            lastError = new Error(`Model ${model} not found: ${errText}`);
            continue;
          }
          throw new Error(`Ollama HTTP ${response.status}: ${errText}`);
        }

        const result = await response.json();
        console.log(`Ollama response received using ${model}.`);
        const text = result.message?.content;
        console.log("Raw Ollama text:", text);

        // Clean up the response if it contains markdown code blocks
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
          const data = JSON.parse(cleanText);
          console.log("Successfully extracted invoice data!");
          return res.json(data);
        } catch (parseError) {
          console.error(`Failed to parse ${model} response:`, text);
          // Try next model
          lastError = parseError;
          continue;
        }
      } catch (apiError) {
        // If connection refused, Ollama is not running
        if (apiError.cause?.code === "ECONNREFUSED" || apiError.message?.includes("ECONNREFUSED")) {
          return res.status(503).json({
            message: "Ollama is not running",
            error: "Cannot connect to Ollama at " + OLLAMA_BASE_URL,
            suggestion: "Start Ollama with 'ollama serve' or download from https://ollama.ai"
          });
        }

        lastError = apiError;
        console.log(`Model ${model} failed: ${apiError.message}. Trying next model...`);
        continue;
      }
    }

    // If all models failed
    throw new Error(`All Ollama models failed. Last error: ${lastError?.message || "Unknown error"}. Make sure you have pulled the model with: ollama pull ${OLLAMA_MODEL}`);

  } catch (error) {
    console.error("Error extracting invoice details:", error);

    // Handle Ollama connection errors
    if (error.cause?.code === "ECONNREFUSED" || error.message?.includes("ECONNREFUSED")) {
      return res.status(503).json({
        message: "Ollama is not running",
        error: "Cannot connect to Ollama at " + OLLAMA_BASE_URL,
        suggestion: "Start Ollama with 'ollama serve' or download from https://ollama.ai"
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      suggestion: `Make sure Ollama is running and model '${OLLAMA_MODEL}' is pulled. Run: ollama pull ${OLLAMA_MODEL}`
    });
  }
};