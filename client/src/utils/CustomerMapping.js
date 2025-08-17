import { getCustomerById } from "../api/customerApi.js";

export async function CustomerMap(invoiceData) {
  // console.log(invoiceData)
  const customerPromises = invoiceData.map((invoice) => {
    return getCustomerById(invoice.customerDetails);
  });
  const customers = await Promise.all(customerPromises);
  invoiceData.forEach((invoice, index) => {
    invoice.customerDetails = customers[index];
  });

  return invoiceData;
}
