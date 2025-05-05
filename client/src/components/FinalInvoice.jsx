import CustomerDetails from "./CustomerDetails";
import ProductTable from "./ProductTable";
const FinalInvoice = ({ invoice, showInvoice }) => {
  return (
    <div className="invoiceContainer">
      <div className="headerContainer">
        <h1 className="invoice font-bold text-3xl tracking-wide">
          Tax Invoice
        </h1>
        <div className="flex justify-between mt-5 bg-blue-100">
        <CustomerDetails customer={invoice.customerDetails} />
        <div>
        <p className="text-md"><span>Date: </span>{new Date(invoice.date).toLocaleDateString("en-GB")}</p>
        <p className="text-md"><span>Invoice No.: </span>{invoice.invoiceNumber}</p>
        </div>
        </div>
        <ProductTable invoice={invoice} onShowInvoice={showInvoice} />
      </div>
    </div>
  );
};

export default FinalInvoice;
