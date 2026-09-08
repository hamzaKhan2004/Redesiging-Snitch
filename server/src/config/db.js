import mongoose from "mongoose";
import config from "./config.js";


export const connectToDB = async () => {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connect TO DB");
}