import CustomerDetails from "../models/CustomerModel.js";

export const getAllCustomer = async (req, res) => {
  try {
    const customer = await CustomerDetails.find({});
    res.status(200).json(customer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch customers", error: err.message });
  }
};

export const getCustomerByID = async (req, res) => {
  try {
    const id = req.params
    // console.log(id)
    const customerDetails = await CustomerDetails.findById(id.id)
       res.status(200).json(customerDetails);
  } catch (err) {
    console.error("Failed to get customer by id : ", { error: err.message });
  }
};
