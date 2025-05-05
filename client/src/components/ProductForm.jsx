const ProductForm = ({
  customers,
  invoice,
  onItemChange,
  onCustomerChange,
}) => {
  let item = invoice.item;

  return (
    <div>
      <div className="invoiceNUmber flex justify-between ">
        <input
          type="number"
          placeholder="Invoice No."
          value={invoice.invoiceNumber}
          name="invoiceNumber"
          onChange={onItemChange}
          className="w-fit p-2 border rounded"
        ></input>

        <input
          type="date"
          name="date"
          id="date"
          value={invoice.date}
          onChange={onItemChange}
          className="w-fit p-2 border rounded"
        />
      </div>
      <div className="mt-4">
        <select
          value={invoice.customerName}
          onChange={onCustomerChange}
          className="w-fit p-2 border rounded"
        >
          <option value="">Select Company Name</option>
          {customers.map((customer, index) => (
            <option key={index} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <h3 className="text-lg mt-4 font-semibold">Product Details</h3>
      <div className="w-full flex flex-wrap sm:space-y-0 space-y-2 space-x-2 mb-2">
        <input
          type="text"
          placeholder="Product Name"
          value={item.name}
          name="name"
          onChange={onItemChange}
          className="flex-1 p-2 border rounded"

        />
        <input
          type="number"
          placeholder="Quantity"
          value={item.quantity}
          name="quantity"
          onChange={onItemChange}
          className="w-24 p-2 border rounded"
          // min="1"
        />
        <input
          type="number"
          placeholder="HSN"
          value={item.hsn}
          name="hsn"
          onChange={onItemChange}
          className="w-24 p-2 border rounded"
          // min="1"
        />
        <input
          type="number"
          placeholder="Price"
          value={item.price}
          name="price"
          onChange={onItemChange}
          className="w-32 p-2 border rounded"
          // min="1"
          step=".01"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </div>
  );
};

export default ProductForm;
