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
    total : 0,
    roundOff : 0
  });
  return (
    <div className=" w-screen p-2 bg-white h-fit min-h-full  md:px-5  shadow-md rounded-lg flex  flex-col ">
      <CompanyTitle/>
      {showInvoice ? (
        <>
          <FinalInvoice invoice={invoice} setInvoice={setInvoice} showInvoice={showInvoice} />
          <button
            className=" border-radius-5 bg-blue-500 rounded text-white font-bold px-4 w-fit mx-auto py-2 capitalize  hover:bg-blue-600 text-xl"
            onClick={() => {
              setShowInvoice(false);
            }}
          >
            Edit invoice
          </button>
        </>
      ) : (
        <>
          <EditForm invoice={invoice} setInvoice={setInvoice} showInvoice={showInvoice}/>
          <button
            className=" border-radius-5 mt-10 bg-blue-500 rounded text-white font-bold px-4 w-fit mx-auto py-2 capitalize  hover:bg-blue-600 text-xl"
            onClick={() => {
              setShowInvoice(true);
            }}
          >
            preview invoice
          </button>
        </>
      )}
    </div>
  );
};

export default Invoice;
