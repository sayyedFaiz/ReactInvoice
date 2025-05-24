import { useState } from "react";
import EditForm from "../components/EditForm";
import FinalInvoice from "../components/FinalInvoice";
import CompanyTitle from "../components/CompanyTitle";
const Invoice = () => {
  const [showInvoice, setShowInvoice] = useState(false);

  const [invoice, setInvoice] = useState({
    invoiceNumber: "", // Stores the unique invoice number
    date: new Date().toISOString().split("T")[0],
    customerName: "",
    customerDetails: null,
    item: { name: "", quantity: "", price: "", hsn: "", amount: "" }, // Only one item at a time
    items: [],
    total: 0,
    roundOff:0,
    grandTotal:0
  });
  const handleShowInvoice = () => {
    setShowInvoice(true);
  };
  const printInvoice = () => {
    window.print();
  };
  const downloadInvoice = () => {
    alert("Download feature is not implemented yet.");
  };
  return (
    <div className=" w-screen   h-full    flex  flex-col ">
      {showInvoice ? (
        <>
        <CompanyTitle />
          <div className="flex w-full justify-center  ">
            <button
              className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 my-4 w-fit   capitalize  hover:bg-blue-600 text-xl"
              onClick={() => {
                setShowInvoice(false);
              }}
            >
              Edit invoice
            </button>
            <button
              className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 my-4 w-fit mx-5 capitalize  hover:bg-blue-600 text-xl"
              onClick={() => printInvoice()}
            >
              print
            </button>
            <button
              className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 my-4 w-fit   capitalize  hover:bg-blue-600 text-xl"
              onClick={() => downloadInvoice()}
            >
              download
            </button>
          </div>

          <FinalInvoice invoice={invoice} />
        </>
      ) : (
        <>
          <CompanyTitle />
          <EditForm
            invoice={invoice}
            setInvoice={setInvoice}
            showInvoice={showInvoice}
          />
          {invoice.items.length > 0 && (
            <button
              className="cursor-pointer border-radius-5 my-5 bg-blue-500 rounded text-white font-bold px-4 w-fit mx-auto py-2 capitalize  hover:bg-blue-600 text-xl"
              onClick={() => handleShowInvoice()}
            >
              {" "}
              preview
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Invoice;
