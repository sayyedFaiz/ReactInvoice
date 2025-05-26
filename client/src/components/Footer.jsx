function Footer() {
  return (
    <>
      <div className="footerContainer w-full mt-5 flex flex-col justify-between items-center ">
        <div className="w-full   flex justify-between mb-5">
          <div className="termsAndConditionContainer w-1/2 ">
            <h1 className="text-xl font-bold">Terms and Conditions:</h1>
            <ol className="text-md mt-2 list-decimal list-inside">
              <li>Goods once sold cannot be returned</li>
              <li>
                We are not responsible for breakage and/or shortage of goods
                after delivery
              </li>
            </ol>
          </div>
          <div className="signatureContainer flex flex-col h-full w-1/2   text-center justify-end pt-10">
            <h1 className="text-2xl font-bold">Faisal Sayyed</h1>
            <p className="text-md font-medium">Proprietor</p>
          </div>
        </div>
        <div className="row footer flex justify-center bg-gray-200 rounded-4xl w-full">
          <div className="companyAddress-container flex px-1 py-2  justify-center items-center">
            <img src="/images/ion_location-outline.svg" alt="" />
            <p className="company-address my-0 mx-2 text-md">
              E-6, Swastik Estate, Behind Milan Palace Goddev Road, Bhayander
              (East)-401105
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
