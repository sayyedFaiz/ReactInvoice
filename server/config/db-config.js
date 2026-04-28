import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Fix for ECONNREFUSED DNS issues with MongoDB Atlas SRV URIs
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      family: 4 // Force IPv4 to avoid resolution issues on some networks
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log("error connecting to DB:", error);
    process.exit(1);
  }
};

export default connectDB;
