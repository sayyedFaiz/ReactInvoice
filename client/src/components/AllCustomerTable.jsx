function AllCustomerTable({ customers }) {
  return (
    <div className="flex flex-col items-center w-full mt-6 ">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] table-auto w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-black">
              <th className="border border-gray-400 text-white text-center p-3">
                Sr. No.
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
                Customer Name
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
                Customer Address
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
                Customer GST
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
                Tax Type
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
                Tax Rate
              </th>
              <th className="border border-gray-400 text-white text-center p-3">
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
                      <select
                        name="transport"
                        className="w-full sm:w-auto  px-2 py-1"
                      >
                        {data.transport.map((transport, idx) => (
                          <option key={idx} value={transport}>
                            {transport}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
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

export default AllCustomerTable;
