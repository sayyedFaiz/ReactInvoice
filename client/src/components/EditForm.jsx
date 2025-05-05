import CustomerDetails from "./CustomerDetails";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";

export default function MainForm({ invoice, setInvoice, showInvoice }) {
  const customers = [
    {
      name: "Brassotech International",
      address:
        "484/A, GIDC, Shankar Tekri, Industrial estate, Jaam Nagar, Gujarat-361004",
      gstNumber: "24AANFB7797G1ZY",
    },
    {
      name: "Tech Solutions Pvt Ltd",
      address: "12, IT Park, Bangalore, Karnataka-560001",
      gstNumber: "29AAACB1234C1ZP",
    },
  ];

  const handleInvoiceChange = (e) => {
    let { name, value, type } = e.target;
    // Convert numeric values properly
    value = type === "number" ? Number(value) : value;
    setInvoice((prev) => ({
      ...prev,
      // If the field belongs to 'item', update inside 'item'
      item: name in prev.item ? { ...prev.item, [name]: value } : prev.item,
      // Otherwise, update the invoice's own fields
      ...(name in prev.item ? {} : { [name]: value }),
    }));
  };

  // Handle customer selection
  const handleCustomerChange = (e) => {
    const selectedCustomer = customers.find((c) => c.name === e.target.value);
    setInvoice((prev) => ({
      ...prev,
      customerName: e.target.value,
      customerDetails: selectedCustomer,
    }));
  };
  const addItem = (e) => {
    e.preventDefault();
    setInvoice((prev) => {
      // Ensure the item's total is calculated before adding
      const newItem = {
        ...prev.item,
        amount: prev.item.quantity * parseFloat(prev.item.price),
      };
      // Add the new item to the items array
      const updatedItems = [...prev.items, newItem];
      // Calculate the grand total by summing all items' total price
      const { total, roundedTotal } = calculateTotal(updatedItems);
      return {
        ...prev,
        items: updatedItems, // Add the current item to the items array
        item: { name: "", quantity: 0, price: 0, hsn: "", amount: 0 }, // Reset the item
        total, // Store the calculated grand total
        roundOff: roundedTotal - total, // Store the round-off value
      };
    });
  };
  const calculateTotal = (updatedItems) => {
    const total = updatedItems.reduce((acc, item) => acc + item.amount, 0);
    // console.log(total);
    // Round the total to the nearest 0.50
    const roundedTotal = Math.round(total * 2) / 2;
    return { total, roundedTotal };
  };

  const handleDeleteItem = (indexToRemove) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.filter(
        (_, index) => index !== indexToRemove
      );
      const { total, roundedTotal } = calculateTotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        total,
        roundOff: roundedTotal - total,
      };
    });
  };

  const handleItemEditSave = (index, updatedItem) => {
    setInvoice((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = updatedItem;
      const { total, roundedTotal } = calculateTotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        total,
        roundOff: roundedTotal - total,
      };
    });
  };

  return (
    <>
      <div>
        <form className="space-y-4" onSubmit={addItem}>
          <CustomerDetails customer={invoice.customerDetails} />
          <ProductForm
            customers={customers} // Pass the customers list to the form
            invoice={invoice} // Pass the current product item to the form
            onItemChange={handleInvoiceChange}
            onCustomerChange={handleCustomerChange}
          />
          <ProductTable
            invoice={invoice}
            onItemDelete={handleDeleteItem}
            onItemSave={handleItemEditSave}
            onShowInvoice={showInvoice}
          />
        </form>
      </div>
    </>
  );
}
