import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB Connected");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
