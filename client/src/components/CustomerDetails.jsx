const CustomerDetails = ({ customer }) => {
    if (!customer) return null;

    return (
      <div className="w-1/2 ">
        <h1 className="text-xl">To</h1>
        <p className="font-bold text-xl"> {customer.name}</p>
        <p><span className="font-bold">Address:</span> {customer.address}</p>
        <p><span className="font-bold">GST Number:</span> {customer.gstNumber}</p>
      </div>
    );
  };



  export default CustomerDetails;
