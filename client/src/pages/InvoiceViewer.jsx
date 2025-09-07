import { useState, useEffect } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import MyDocument from "../components/DownloadPDF/DownloadPDF";
import { getInvoiceById } from "../api/invoiceApi";
import { CustomerMap } from "../utils/CustomerMapping.js";
import { useParams } from "react-router-dom";
function InvoiceViewer() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  useEffect(() => {
    const fetchInvoiceAndCustomer = async () => {
      try {
        const invoiceData = await getInvoiceById(id);
        // console.log(invoiceData);
        setInvoice(await CustomerMap([invoiceData]));
      } catch (err) {
        console.error("Error loading invoice:", err);
        throw err;
      }
    };
    fetchInvoiceAndCustomer();
  }, [id]);
  useEffect(() => {
    // Auto-download PDF on mobile once invoice is loaded
    if (invoice && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      (async () => {
        const blob = await pdf(<MyDocument invoice={invoice[0]} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${invoice[0].invoiceNumber}.pdf`;
        link.click();
        URL.revokeObjectURL(url); // clean up
      })();
    }
  }, [invoice]);

  return (
    <>
      {!invoice ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          <div className="w-full h-full">
            <div className="w-full h-full ">
              <PDFViewer className="w-full  h-full">
                <MyDocument invoice={invoice[0]} />
              </PDFViewer>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceViewer;
