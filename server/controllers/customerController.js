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
