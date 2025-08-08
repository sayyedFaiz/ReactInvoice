import axios from "axios";
const API_URL = "http://localhost:5000/api/customers";

export const getAllCustomers = async ()=>{
  const res = await axios.get(API_URL)
  return res.data
}

export const getCustomerById = async (id)=>{
  // console.log(id)
  const res = await axios.get(`${API_URL}/getCustomerById/${id}`,)
  return res.data
}