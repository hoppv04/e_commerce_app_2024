import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://phamhopxd1:phamvanhop2004@cluster0.ydwuh.mongodb.net/"
    );
    console.log("Connect MongoDB successfully");
  } catch (error) {
    console.log(`Connect MongoDB failed: ${error}`);
  }
};

export default connectMongoDB;
