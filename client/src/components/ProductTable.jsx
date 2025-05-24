import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit, MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const ProductTable = ({ invoice, onItemDelete, onItemSave, onShowInvoice }) => {
  console.log(invoice);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingItem, setEditingItem] = useState({});

  const toggleEdit = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingItem({});
    } else {
      setEditingIndex(index);
      setEditingItem({ ...invoice.items[index] });
    }
  };

  const ediItem = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const saveItem = () => {
    onItemSave(editingIndex, {
      ...editingItem,
      amount: editingItem.quantity * editingItem.price,
    });
    setEditingIndex(null);
    setEditingItem({});
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-400">
      <thead>
        <tr className="bg-black">
          <th className="border border-gray-400 text-white p-2">Sr. No.</th>
          <th className="border border-gray-400 text-white p-2">
            Product Name
          </th>
          <th className="border border-gray-400 text-white p-2">HSN</th>
          <th className="border border-gray-400 text-white p-2">Quantity</th>
          <th className="border border-gray-400 text-white p-2">Price</th>
          <th className="border border-gray-400 text-white p-2">Amount</th>
          {!onShowInvoice && (
            <th className="border border-gray-400 text-white p-2">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {invoice.items.map((item, index) => (
          <tr key={index}>
            <td className="border border-gray-400 p-2">{index + 1}</td>
            {editingIndex === index ? (
              <>
                <td className="border p-2">
                  <input
                    name="name"
                    value={editingItem.name}
                    onChange={ediItem}
                    className="w-full border px-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="hsn"
                    value={editingItem.hsn}
                    onChange={ediItem}
                    className="w-full border px-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="quantity"
                    type="number"
                    value={editingItem.quantity}
                    onChange={ediItem}
                    className="w-full border px-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    name="price"
                    type="number"
                    value={editingItem.price}
                    onChange={ediItem}
                    className="w-full border px-1"
                  />
                </td>
                <td className="border p-2">
                  {(editingItem.quantity * editingItem.price).toFixed(2)}
                </td>
                {!onShowInvoice && (
                  <td className="border border-gray-400 p-2 text-center">
                    <button
                      type="button"
                      className="hover:bg-gray-200 rounded-full p-2"
                      onClick={() => toggleEdit(index)}
                    >
                      <MdCancel className="text-2xl fill-red-500 cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-gray-200 rounded-full p-2"
                      onClick={saveItem}
                    >
                      <FaCheck className="text-2xl fill-green-500 cursor-pointer" />
                    </button>
                  </td>
                )}
              </>
            ) : (
              <>
                <td className="border border-gray-400 p-2">{item.name}</td>
                <td className="border border-gray-400 p-2">{item.hsn}</td>
                <td className="border border-gray-400 p-2">{item.quantity}</td>
                <td className="border border-gray-400 p-2">
                  {parseFloat(item.price || 0).toFixed(2)}
                </td>
                <td className="border border-gray-400 p-2">
                  {parseFloat(item.amount || 0).toFixed(2)}
                </td>
                {!onShowInvoice && (
                  <td className="border border-gray-400 p-2 text-center">
                    <button
                      type="button"
                      className="hover:bg-gray-200 rounded-full p-2"
                      onClick={() => onItemDelete(index)}
                    >
                      <RiDeleteBin5Fill className="text-2xl fill-red-500 cursor-pointer" />
                    </button>
                    <button
                      type="button"
                      className="hover:bg-gray-200 rounded-full p-2"
                      onClick={() => toggleEdit(index)}
                    >
                      <MdEdit className="text-2xl fill-gray-500 cursor-pointer" />
                    </button>
                  </td>
                )}
              </>
            )}
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td
            colSpan="4"
            rowSpan="7"
            className="border p-2 border-gray-400 text-left"
          >
            <div className="flex flex-col">
              <span className="font-bold text-xl">Payment Method:</span>
              <span className="text-lg">Bank Name: IndusInd Bank Limited</span>
              <span className="text-lg">Account Number: 259867538527</span>
              <span className="text-lg">Branch: Bhayander East</span>
              <span className="text-lg">IFSC Code: INDB0000582</span>
            </div>
          </td>
        </tr>
        <tr>
          <td className="border p-2 border-gray-400">Total</td>
          <td className="border border-gray-400 p-2">
            {invoice.total.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">
            CGST{" "}
            {invoice.customerDetails.taxType === "CGST+SGST"
              ? `- ${invoice.customerDetails.taxRate}%`
              : ``}
          </td>
          <td className="border border-gray-400 p-2">
            {invoice.customerDetails.taxType === "CGST+SGST"
              ? invoice.cgst.toFixed(2)
              : `-`}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">
            SGST{" "}
            {invoice.customerDetails.taxType === "CGST+SGST"
              ? `- ${invoice.customerDetails.taxRate}%`
              : ``}
          </td>
          <td className="border border-gray-400 p-2">
            {invoice.customerDetails.taxType === "CGST+SGST"
              ? invoice.sgst.toFixed(2)
              : `-`}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2">
            IGST{" "}
            {invoice.customerDetails.taxType === "IGST"
              ? `- ${invoice.customerDetails.taxRate}%`
              : ``}
          </td>
          <td className="border border-gray-400 p-2">
            {invoice.customerDetails.taxType === "IGST" ? invoice.igst.toFixed(2) : `-`}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-400 p-2 text-left">Round Off</td>
          <td className="border border-gray-400 p-2 text-left">
            {invoice.roundOff >= 0
              ? `+${invoice.roundOff.toFixed(2)}`
              : invoice.roundOff.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td className="border p-2 border-gray-400 text-left font-bold">
            Grand Total
          </td>
          <td className="border border-gray-400 p-2 text-left font-bold">
            {invoice.grandTotal.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;
