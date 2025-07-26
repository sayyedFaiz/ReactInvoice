import {
  createInvoice,
  getAllInvoice,
  inputValidation
} from "../controllers/invoiceController.js";
import express from "express";

const router = express.Router();

router.post("/Create-Invoice", createInvoice);
router.post("/check", inputValidation);

router.get("/", getAllInvoice);

export default router;
