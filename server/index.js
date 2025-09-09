import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db-config.js"
import invoiceRoutes from "./routes/invoiceRoutes.js"
import customerRoutes from "./routes/customerRoutes.js"
dotenv.config();
const app = express();
app.use(express.json())
// Example for Express.js
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
;
connectDB()

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API IS RUNNING.........")
})
app.use("/api/invoices",invoiceRoutes)
app.use("/api/customers",customerRoutes)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
