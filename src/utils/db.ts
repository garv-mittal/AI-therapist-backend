import mongoose from "mongoose";
import { logger } from "./logger";




const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log(`   no mongo uri found   `)
    }
    const MONGODB_URI: string = process.env.MONGODB_URI!;
    await mongoose.connect(MONGODB_URI);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;