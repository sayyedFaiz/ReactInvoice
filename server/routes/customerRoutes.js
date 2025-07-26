import express from "express"
import {getAllCustomer} from "../controllers/customerController.js"

const router = express.Router()


router.get("/", getAllCustomer)
export default router