import { Link } from "react-router-dom";
import AllInvoiceTable from "../components/AllInvoiceTable";

const AllInvoice = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col pt-10  px-10 ">
        <div>
          <Link
            to="/Create-Invoice"
            className="btn font-bold capitalize border rounded-md px-4 py-2 hover:bg-black hover:text-white"
          >
            create invoice
          </Link>
        </div>
        <div className="w-full  mt-10">
          <AllInvoiceTable />
        </div>
      </div>
    </>
  );
};

export default AllInvoice;
