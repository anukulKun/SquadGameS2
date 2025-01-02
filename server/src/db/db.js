import mongoose from "mongoose";

let MongoURI = process.env.MONGO_URI;
export const connectToDB = async () => {
  try {
    await mongoose.connect(MongoURI, {
      dbName: "_",
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};
