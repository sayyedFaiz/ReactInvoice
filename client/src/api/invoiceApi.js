import axios from "axios";
const API_URL = "http://localhost:5000/api/invoices";

export const createInvoice = async (invoiceData) => {
  const res = await axios.post(`${API_URL}/Create-Invoice`, { invoiceData });
  return res.data;
};

export const checkForUniqueInvoiceNo = async (invoiceNumber) => {
  const res = await axios.post(`${API_URL}/check`, { invoiceNumber });
  if (res.data.exists) {
    throw new Error("Duplicate invoice number");
  }
};


export const getAllInvoice = async ()=> {
  const res = await axios.get(API_URL)
  return res.data
}