import Invoice from "../models/InvoiceModel.js";

export const createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body.invoiceData);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const inputValidation = async (req, res) => {
  try {
    const existingInvoiceNumber = await Invoice.findOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    if (existingInvoiceNumber) {
       return res.status(409).json({ message: "Invoice number already exists", exists: true });
    } else {
     return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllInvoice = async (req, res) => {
  try {
    res.status(200).json({ Result: "allInvoice" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
