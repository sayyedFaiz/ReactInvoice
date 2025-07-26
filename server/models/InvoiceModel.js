import mongoose from "mongoose";



const invoiceItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hsn: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true,
  },
});



const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    // customerName: { type: String, required: true },
      customerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerDetails",
      required: true,
    },
    items: [invoiceItemSchema],
    total: { type: Number, required: true },
    roundOff: { type: Number },
    grandTotal: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Invoice', invoiceSchema)