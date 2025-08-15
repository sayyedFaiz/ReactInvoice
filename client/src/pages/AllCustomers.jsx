import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCustomers } from "../api/customerApi.js";
import CustomerTable from "../components/AllCustomerTable";
function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthCustomerList = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch all customers", err);
      } finally {
        setLoading(false);
      }
    };
    fecthCustomerList();
  }, []);

  return (
    <div className="flex flex-col px-2 sm:px-10 pt-10 sm:pt-20 w-full">
      <div className="mb-4">
        <Link to="/add-customer">
          <button className="btn font-bold capitalize border rounded-md px-4 py-2 hover:bg-black hover:text-white w-full sm:w-auto">
            add customer
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : (
        <CustomerTable customers={customers} />
      )}
    </div>
  );
}

export default AllCustomers;
