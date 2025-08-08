import { useEffect, useState } from "react";
import { getAllInvoice } from "../api/invoiceApi.js";
import { CustomerMap } from "../utils/CustomerMapping.js";
function AllInvoiceTable() {
  const [invoiceList, setInvoiceList] = useState([]);
  useEffect(() => {
    const fetchInvoiceList = async () => {
      try {
        const invoiceData = await getAllInvoice();
        console.log(invoiceData)
        // setInvoiceList(invoiceData);
       setInvoiceList(await CustomerMap(invoiceData));

      } catch (err) {
        console.error(
          "failed to get all the invoices : ",
          err.response.data.message
        );
      }
    };
    fetchInvoiceList();
  }, []);

  const hanleViewInvoice = (id) => {
    const url = `/${id}`;
    console.log(url)
    window.open(url, "_blank");
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-400 text-sm">
      <thead>
        <tr className="bg-black">
          <th className="border border-gray-400 text-white text-center p-2">
            Sr. No.
          </th>
          <th className="border border-gray-400 text-white  text-center p-2">
            Invoice Number
          </th>
          <th className="border border-gray-400 text-white  text-center p-2">
            Customer Name
          </th>
          <th className="border border-gray-400 text-white  text-center p-2">
            Quantity
          </th>
          <th className="border border-gray-400 text-white  text-center p-2">
            Total
          </th>
          <th className="border border-gray-400 text-white  text-center p-2">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {invoiceList.length ? (
          invoiceList.map((data, index) => (
            <tr key={data._id}>
              <td className="text-center text-md p-1">{index + 1}</td>
              <td className="text-center text-md p-1">{data.invoiceNumber}</td>
              <td className="text-center text-md p-1">
                {data.customerDetails?.name}
              </td>
              <td className="text-center text-md p-1">
                {data.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className="text-center text-md p-1">{data.grandTotal}</td>
              <td className="text-center text-md p-1">
                <button
                  onClick={() => {
                    hanleViewInvoice(data._id);
                  }}
                  className="border rounded-md px-4 py-1 cursor-pointer"
                >
                  view
                </button>
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
  );
}

export default AllInvoiceTable;
