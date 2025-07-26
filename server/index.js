import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db-config.js"
import invoiceRoutes from "./routes/invoiceRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors());
connectDB()

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API IS RUNNING.........")
})
app.use("/api/invoices",invoiceRoutes)
app.use("/api/customers",customerRoutes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
