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
    item: { name: "", quantity: 0, price: 0, hsn: "", amount: 0 }, // Only one item at a time
    items: [],
    total: 0,
    roundOff: 0,
  });
  const handleShowInvoice = () => {
    // if (invoice.items.length === 0) {
    //   alert("Please add at least one item to the invoice.");
    //   return;
    // }
    setShowInvoice(true);
  };
  const printInvoice = () => {
    window.print();
  };
  const downloadInvoice = () => {
    alert("Download feature is not implemented yet.");
  };
  return (
    <div className=" w-screen p-2  h-full  md:px-5  flex  flex-col ">
      {showInvoice ? (
        <>
          <CompanyTitle />
          <FinalInvoice
            invoice={invoice}
            setInvoice={setInvoice}
            showInvoice={showInvoice}
          />
          <button
            className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 mt-4 w-fit mx-auto  capitalize  hover:bg-blue-600 text-xl"
            onClick={() => {
              setShowInvoice(false);
            }}
          >
            Edit invoice
          </button>
          <div className="flex w-full justify-end  ">
            <button
              className="print:hidden cursor-pointer border-radius-5  mx-2 bg-blue-500 rounded text-white font-bold px-4 w-fit py-2 capitalize  hover:bg-blue-600 text-xl"
              onClick={() => printInvoice()}
            >
              print
            </button>
            <button
              className="print:hidden cursor-pointer border-radius-5  bg-blue-500 rounded text-white font-bold px-4 w-fit  py-2 capitalize  hover:bg-blue-600 text-xl"
              onClick={() => downloadInvoice()}
            >
              download
            </button>
          </div>
        </>
      ) : (
        <>
          <CompanyTitle />
          <EditForm
            invoice={invoice}
            setInvoice={setInvoice}
            showInvoice={showInvoice}
          />
          <button
            className="cursor-pointer border-radius-5 my-5 bg-blue-500 rounded text-white font-bold px-4 w-fit mx-auto py-2 capitalize  hover:bg-blue-600 text-xl"
            onClick={() => handleShowInvoice()}
          >
            {" "}
            preview
          </button>
        </>
      )}
    </div>
  );
};

export default Invoice;
