import MyDocument from "./DownloadPDF/DownloadPDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import CustomerDetails from "./CustomerDetails";
import ProductTable from "./ProductTable";
import Footer from "./Footer";
const FinalInvoice = ({ invoice, showInvoice }) => {
  const printInvoice = () => {
    window.print();
  };
  return (
    <>
      <div className="print:hidden flex w-full justify-center  ">
        <button
          className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 my-4 w-fit mx-5 capitalize  hover:bg-blue-600 text-xl"
          onClick={() => printInvoice()}
        >
          print
        </button>
        <PDFDownloadLink
          document={<MyDocument invoice={invoice} />}
          fileName={`${invoice.customerDetails.name}_${invoice.date}.pdf`}
        >
          <button className="print:hidden cursor-pointer border-radius-5 bg-blue-500 rounded text-white font-bold px-4 py-2 my-4 w-fit   capitalize  hover:bg-blue-600 text-xl">
            download
          </button>
        </PDFDownloadLink>
      </div>

      <div className="print:hidden w-full h-full flex justify-center ">
        <PDFViewer className="w-1/2 h-full ">
          <MyDocument invoice={invoice} />
        </PDFViewer>
      </div>
      <div className="hidden print:flex  flex-col  h-full ">
        <div className="invoiceContainer">
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
        <div className="flex flex-1">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FinalInvoice;
