const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("API IS RUNNING.........")
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
