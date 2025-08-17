import { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
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
        console.log(invoiceData);
        setInvoice(await CustomerMap([invoiceData]));
      } catch (err) {
        console.error("Error loading invoice:", err);
      }
    };
    fetchInvoiceAndCustomer();
  }, [id]);

  return (
    <>
      {!invoice ? (
        <>
          <p>Loading...</p>
        </>
      ) : /Mobi|Android/i.test(navigator.userAgent) ? (
        // If on mobile, download the PDF directly
        // 📱 Mobile → download (forces PDF app)
        <PDFDownloadLink
          document={<MyDocument invoice={invoice[0]} />}
          fileName={`invoice_${invoice[0].invoiceNumber}.pdf`}
        ></PDFDownloadLink>
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
