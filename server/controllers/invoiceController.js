import Invoice from "../models/InvoiceModel.js";

export const createInvoice = async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
    const newInvoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1;
    const invoice = new Invoice({
      ...req.body.invoiceData,
      invoiceNumber: newInvoiceNumber,
    });
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(400).json({ message: error.message });
  }
};

export const inputValidation = async (req, res) => {
  try {
    const existingInvoiceNumber = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    if (existingInvoiceNumber) {
      return res
        .status(409)
        .json({ message: "Invoice number already exists", exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllInvoice = async (req, res) => {
  try {
    const allInvoice = await Invoice.find();
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
