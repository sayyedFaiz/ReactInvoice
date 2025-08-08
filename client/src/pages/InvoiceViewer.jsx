import  {useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
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
          <div className=" w-full flex justify-center">
            <PDFViewer className=" w-full ">
              <MyDocument invoice={invoice[0]} />
            </PDFViewer>
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceViewer;
