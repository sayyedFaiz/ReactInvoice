import express from "express"
import {getAllCustomer, getCustomerByID, addCustomer} from "../controllers/customerController.js"

const router = express.Router()


router.get("/", getAllCustomer)
router.get("/getCustomerByID/:id", getCustomerByID)
router.post("/add-customer",addCustomer)
export default router