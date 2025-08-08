import express from "express"
import {getAllCustomer, getCustomerByID} from "../controllers/customerController.js"

const router = express.Router()


router.get("/", getAllCustomer)
router.get("/getCustomerByID/:id", getCustomerByID)
export default router