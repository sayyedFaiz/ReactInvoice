function CompanyTitle() {
  return (
    <>
      <div className="flex flex-col items-center text-center w-full">
        <h1 className="text-2xl sm:text-3xl uppercase font-bold mb-2">
          sayad enginnering works
        </h1>
        <div className="mb-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5 text-md w-full">
          <p className="phone ">+91 9867538527</p>
          <p className="email md:px-5  ">sayyedengworks@gmail.com</p>
          <p className="gst ">GST:27AHSPB7715N1ZR</p>
        </div>
      </div>
    </>
  );
}

export default CompanyTitle;
