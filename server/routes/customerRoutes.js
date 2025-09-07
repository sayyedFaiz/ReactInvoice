import express from "express"
import {getAllCustomer, getCustomerByID, addCustomer, updateTransport} from "../controllers/customerController.js"

const router = express.Router()


router.get("/", getAllCustomer)
router.get("/getCustomerByID/:id", getCustomerByID)
router.post("/add-customer",addCustomer)
router.put("/update-transport/:id", updateTransport)
export default router