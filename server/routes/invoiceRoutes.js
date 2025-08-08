import {
  createInvoice,
  getAllInvoice,
  getInvoiceById,
  inputValidation,
  getNextInvoiceNumber
} from "../controllers/invoiceController.js";
import express from "express";

const router = express.Router();

router.post("/Create-Invoice", createInvoice);
router.post("/check", inputValidation);

router.get("/", getAllInvoice);
router.get("/getInvoiceById/:id", getInvoiceById)
router.get("/getNextInvoiceNumber",getNextInvoiceNumber)
export default router;
