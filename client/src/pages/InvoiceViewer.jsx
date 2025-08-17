import  {useState, useEffect } from "react";
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
        console.log(invoiceData)
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
      ) : (
        <>
      <div className="w-full flex flex-col items-center">
        <PDFDownloadLink
          document={<MyDocument invoice={invoice[0]} />}
          fileName={`${invoice[0].customerDetails.name}_${new Date(invoice[0].date).toISOString().split("T")[0]}.pdf`}
        >
          <button className="cursor-pointer bg-blue-500 rounded text-white font-bold px-4 py-2 capitalize hover:bg-blue-600 text-base sm:text-xl my-10">
            download
          </button>
        </PDFDownloadLink>
        <div className="w-full flex justify-center">
          <PDFViewer className="w-full max-w-[900px] h-[70vh] sm:h-[80vh] rounded shadow-md">
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
