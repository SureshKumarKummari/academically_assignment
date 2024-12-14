// lib/mongo.js

import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  const url = "mongodb+srv://newuser:P2kSFyK8NBcwPQla@cluster0.e0b6htt.mongodb.net/academically?retryWrites=true&w=majority&appName=Cluster0";
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw error;
  }
};

export default connectDb;
