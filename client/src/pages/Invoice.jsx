import { useState } from "react";
import EditForm from "../components/EditForm";
import FinalInvoice from "../components/FinalInvoice";
import CompanyTitle from "../components/CompanyTitle";
import Footer from "../components/Footer";
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
    roundOff: 0,
    grandTotal: 0,
  });

  const handleShowInvoice = () => {
    if(invoice.items.length === 0) return
    setShowInvoice(true);
  };


  return (
    <div className=" w-screen   h-full    flex  flex-col  ">
      <CompanyTitle />
      {/* Switch Container */}
      <div className="print:hidden relative w-1/3 mx-auto flex flex-row     rounded-xl shadow-md ">
        {/* Sliding background */}
        <div
          className={` h-full  w-1/2    absolute top-0 left-0  border border-gray-400  rounded-xl transition-all duration-300 ease-in-out
            ${!showInvoice ? "" : "translate-x-full"}`}
        />

        <button
          onClick={() => setShowInvoice(false)}
          className={`z-10 mx-auto  py-2  transition-all ${
            !showInvoice ? "font-semibold text-black" : "text-gray-500"
          }`}
        >
          Edit Invoice
        </button>
        <button
          onClick={() => handleShowInvoice()}
          className={`z-10 mx-auto   transition-all ${
            showInvoice ? "font-semibold text-black" : "text-gray-500"
          }`}
        >
          Preview Invoice
        </button>
      </div>
      {showInvoice ? (
        <>

          <FinalInvoice invoice={invoice} />
        </>
      ) : (
        <>
          <EditForm
            invoice={invoice}
            setInvoice={setInvoice}
            showInvoice={showInvoice}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Invoice;
