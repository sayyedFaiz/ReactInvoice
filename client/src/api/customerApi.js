import axios from "axios";
const API_URL = import.meta.env.VITE_CUSTOMER_URL;

export const getAllCustomers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getCustomerById = async (id) => {
  // console.log(id)
  const res = await axios.get(`${API_URL}/getCustomerById/${id}`);
  return res.data;
};

export const addCustomer = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/add-customer`, formData);
    // console.log(res.data)
    return res.data;
  } catch (err) {
    console.error("failed to create a customer", err);
  }
};

export const updateTransport = async (id, transport) => {
  try {
    const res = await axios.put(`${API_URL}/update-transport/${id}`, {
      transport,
    });
    return res.data;
  } catch (err) {
    console.error("failed to update transport", err);
  }
};
