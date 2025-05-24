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
      taxType: "IGST",
      taxRate: 18, //18% IGST
    },
    {
      name: "Tech Solutions Pvt Ltd",
      address: "12, IT Park, Bangalore, Karnataka-560001",
      gstNumber: "29AAACB1234C1ZP",
      taxType: "CGST+SGST",
      taxRate: 9, //9%*2  for CGST+SGST
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
    setInvoice((prev) => {
      const newCustomer = {
        ...prev,
        customerName: e.target.value,
        customerDetails: selectedCustomer,
      };
      const { cgst, sgst, igst, total, roundedGrandTotal, grandTotal } =
        calculateTotal(prev.items, newCustomer.customerDetails);
      return {
        ...prev,
        customerName: e.target.value,
        customerDetails: selectedCustomer,
        total: total,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        roundOff: roundedGrandTotal - grandTotal,
        grandTotal: roundedGrandTotal,
      };
    });
  };
  const addItem = (e) => {
    e.preventDefault();
    if (!invoice.customerName) {
      alert("Please select company name");
      return;
    }
    setInvoice((prev) => {
      // Ensure the item's total is calculated before adding
      const newItem = {
        ...prev.item,
        amount: prev.item.quantity * parseFloat(prev.item.price),
      };
      // Add the new item to the items array
      const updatedItems = [...prev.items, newItem];
      // Calculate the grand total by summing all items' total price

      const { cgst, sgst, igst, total, roundedGrandTotal, grandTotal } =
        calculateTotal(updatedItems, prev.customerDetails);
      console.log("CustomerDetails", prev.customerName);

      return {
        ...prev,
        items: updatedItems, // Add the current item to the items array
        item: { name: "", quantity: "", price: "", hsn: "", amount: "" }, // Reset the item
        total: total,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        roundOff: roundedGrandTotal - grandTotal,
        grandTotal: roundedGrandTotal,
      };
    });
  };

  const handleDeleteItem = (indexToRemove) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.filter(
        (_, index) => index !== indexToRemove
      );
      const { cgst, sgst, igst, total, roundedGrandTotal, grandTotal } =
        calculateTotal(updatedItems, prev.customerDetails);
      return {
        ...prev,
        items: updatedItems,
        total: total,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        roundOff: roundedGrandTotal - grandTotal,
        grandTotal: roundedGrandTotal,
      };
    });
  };

  const handleItemEditSave = (index, updatedItem) => {
    setInvoice((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = updatedItem;
      const { cgst, sgst, igst, total, roundedGrandTotal, grandTotal } =
        calculateTotal(updatedItems, prev.customerDetails);
      return {
        ...prev,
        items: updatedItems,
        total: total,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        roundOff: roundedGrandTotal - grandTotal,
        grandTotal: roundedGrandTotal,
      };
    });
  };
  const calculateTotal = (updatedItems, customerDetails) => {
    const total = updatedItems.reduce((acc, item) => acc + item.amount || 0, 0);
    // console.log(total);
    // Round the total to the nearest 0.50
    let igst = 0,
      sgst = 0,
      cgst = 0;
    if (customerDetails) {
      if (customerDetails.taxType === "IGST") {
        igst = total * (customerDetails.taxRate / 100);
      } else if (customerDetails.taxType === "CGST+SGST") {
        cgst = total * (customerDetails.taxRate / 100);
        sgst = total * (customerDetails.taxRate / 100);
      }
    }
    const totalTax = igst + cgst + sgst;
    const grandTotal = total + totalTax;
    const roundedGrandTotal = Math.round(grandTotal);

    return { cgst, sgst, igst, total, roundedGrandTotal, grandTotal };
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
          {invoice.items.length > 0 && (
            <ProductTable
              invoice={invoice}
              onItemDelete={handleDeleteItem}
              onItemSave={handleItemEditSave}
              onShowInvoice={showInvoice}
            />
          )}
        </form>
      </div>
    </>
  );
}
