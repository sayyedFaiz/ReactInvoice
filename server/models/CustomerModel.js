import mongoose from "mongoose";

const customerDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  gstNumber: { type: String },
  taxType: { type: String, enum: ["IGST", "CGST/SGST"], required: true },
  taxRate: { type: Number, required: true },
  transport: [{ type: String }],
});

export  default mongoose.model('CustomerDetails', customerDetailsSchema)