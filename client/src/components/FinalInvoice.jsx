import CustomerDetails from "./CustomerDetails";
import ProductTable from "./ProductTable";


const FinalInvoice = ({ invoice, showInvoice }) => {
  return (
    <>

      <div className="flex flex-col justify-between h-full ">
        <div className="invoiceContainer">
          <div className="headerContainer">
            <h1 className="invoice font-bold text-3xl tracking-wide">
              Tax Invoice
            </h1>
            <div className="flex justify-between mt-5">
              <CustomerDetails customer={invoice.customerDetails} />
              <div>
                <p className="text-md">
                  <span>Date: </span>
                  {new Date(invoice.date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-md">
                  <span>Invoice No.: </span>
                  {invoice.invoiceNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ProductTable invoice={invoice} onShowInvoice={showInvoice} />
          </div>
        </div>
        <div className="text-3xl flex  mt-5 justify-center align-center">
          footer
        </div>
      </div>
    </>
  );
};

export default FinalInvoice;
