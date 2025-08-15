import { Link } from "react-router-dom";
import AllInvoiceTable from "../components/AllInvoiceTable";

const AllInvoice = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col pt-6 px-4 sm:pt-10 sm:px-10 ">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-0 items-center justify-center">
          <Link to="/create-invoice">
            <button className="btn font-bold capitalize border rounded-md px-4 py-2 hover:bg-black hover:text-white mr-0 sm:mr-4 w-full sm:w-auto">
              create invoice
            </button>
          </Link>
          <Link to="/customers">
            <button className="btn font-bold capitalize border rounded-md px-4 py-2 hover:bg-black hover:text-white w-full sm:w-auto">
              view customers
            </button>
          </Link>
        </div>
        <div className="w-full  mt-6 sm:mt-10 overflow-x-auto">
          <AllInvoiceTable />
        </div>
      </div>
    </>
  );
};

export default AllInvoice;
