import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCustomers } from "../api/customerApi.js";
function AllCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fecthCustomerList = async () => {
      try {
        const data = await getAllCustomers();
        console.log(data);
        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch all customers", err);
      }
    };
    fecthCustomerList();
  }, []);
  return (
    <div className="flex flex-col px-10 pt-20 w-full">
      <div className="">
        <Link to="/add-customer">
          <button className="btn font-bold capitalize border rounded-md px-4 py-2 hover:bg-black hover:text-white">
            add customer
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center w-full mt-10 ">
        <table className="table-auto w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-black">
              <th className="border border-gray-400 text-white text-center p-3">
                Sr. No.
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Customer Name
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Customer Address
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Customer GST
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Tax Type
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Tax Rate
              </th>
              <th className="border border-gray-400 text-white  text-center p-3">
                Transport
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.length ? (
              customers.map((data, index) => (
                <tr key={data._id}>
                  <td className="text-center text-md p-3 ">{index + 1}</td>
                  <td className="text-center text-md p-3 ">{data.name}</td>
                  <td className="text-center text-md p-3 ">{data.address}</td>
                  <td className="text-center text-md p-3 ">{data.gstNumber}</td>
                  <td className="text-center text-md p-3 ">{data.taxType}</td>
                  <td className="text-center text-md p-3 ">{data.taxRate}%</td>
                  <td className="text-center text-md p-3 ">
                    {data.transport.length ? (
                    <select name="transport">
                      {data.transport.map((transport, index) => {
                        return (<option key={index} value={transport}>{transport}</option>)
                      })}
                    </select>
                    ) :("N/A")
                  }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-2 text-lg capitalize text-red-500 font-medium"
                >
                  no data available
                </td>
              </tr>
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
}

export default AllCustomers;
