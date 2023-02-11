import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.CONNECTION_STRING);
    mongoose.Promise = global.Promise;
} catch (err) {
    console.log(err.message);
}


export default mongoose;