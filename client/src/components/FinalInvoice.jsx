import { useEffect, useState } from "react";
import MyDocument from "./DownloadPDF/DownloadPDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import CustomerDetails from "./CustomerDetails";
import ProductTable from "./ProductTable";
import Footer from "./Footer";
import { createInvoice, checkForUniqueInvoiceNo } from "../api/invoiceApi";
const FinalInvoice = ({ invoice, showInvoice }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Function to submit the invoice to the database
  // It checks for unique invoice number before submitting
  const submitInvoiceToDB = async (invoiceData) => {
    if (isSubmitted || isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    try {
      await checkForUniqueInvoiceNo(invoiceData.invoiceNumber);
      await createInvoice(invoiceData);
      setIsSubmitted(true);
      // Show success message using toast or custom notification
    } catch (error) {
      if (
        error?.response?.data?.message === "Invoice number already exists" ||
        error.message === "Duplicate invoice number"
      ) {
        alert("Invoice number already exists. Please use a different one.");
      } else {
        alert(
          `Error saving invoice: ${error.message || "Unknown error occurred"}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleAction = async (action) => {
    const invoiceToSave = JSON.parse(JSON.stringify(invoice));

    // First submit to database
    await submitInvoiceToDB(invoiceToSave);

    // If submission was successful, proceed with the action

    if (action === "print") {
      window.print();
    }
    // Download happens automatically through PDFDownloadLink
  };
  return (
    <>
      <div className="print:hidden flex w-full justify-center gap-4 mb-2">
        {!isTouchDevice && (
          <button
            className={`cursor-pointer rounded text-white font-bold px-4 py-2 capitalize text-base sm:text-xl bg-blue-500 hover:bg-blue-600`}
            onClick={() => handleAction("print")}
          >
            Print
          </button>
        )}
        <PDFDownloadLink
          document={<MyDocument invoice={invoice} />}
          fileName={`${invoice.customerDetails.name}_${invoice.date}.pdf`}
        >
          {({ loading }) => (
            <button
              onClick={async () => {
                if (isSubmitting) return;
                await submitInvoiceToDB(invoice);
                // download will happen automatically
              }}
              disabled={loading || isSubmitting}
            >
              {loading
                ? "Generating PDF..."
                : isSubmitting
                ? "Saving..."
                : "Download"}
            </button>
          )}
        </PDFDownloadLink>
      </div>

      <div className="print:hidden w-full h-full flex justify-center ">
        <PDFViewer
          className="w-1/2  h-full rounded shadow-md"
          style={{ minWidth: 320 }}
        >
          <MyDocument invoice={invoice} />
        </PDFViewer>
      </div>
      <div className="print-container flex-col h-auto">
        <div className="invoiceContainer flex flex-col w-full h-full mx-auto">
          <div className="headerContainer">
            <h1 className="invoice font-extrabold text-3xl tracking-wide uppercase">
              Tax Invoice
            </h1>
            <div className="flex justify-between mt-3">
              <CustomerDetails customer={invoice.customerDetails} />
              <div>
                <p className="text-md">
                  <span className="font-bold">Date: </span>
                  {new Date(invoice.date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-md">
                  <span className="font-bold">Invoice No.: </span>
                  {invoice.invoiceNumber}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <ProductTable invoice={invoice} onShowInvoice={!showInvoice} />
          </div>
        </div>
        <div className="footerContainer mt-4">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FinalInvoice;
