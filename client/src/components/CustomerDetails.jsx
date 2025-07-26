const CustomerDetails = ({ customer }) => {
  if (!customer) return null;
  console.log(customer)
  return (
    <div className="w-1/2 ">
      <h1 className="text-lg">To</h1>
      <p className="font-bold text-xl"> {customer.name}</p>
      <p className=" text-md">
        <span className="font-bold">Address:</span> {customer.address}
      </p>
      <p className=" text-md">
        <span className="font-bold ">GST Number:</span> {customer.gstNumber}
      </p>
      <p className=" text-md">
        <span className="font-bold ">Transport:</span> {customer.transport.length ? customer.transport : "N/A"}
      </p>
    </div>
  );
};

export default CustomerDetails;
