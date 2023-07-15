import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

if(!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local file.")
}
console.log(process.env.MONGODB_URI)
let mongoClient;
const uri = process.env.MONGODB_URI;
const options = {}

export async function connectToMongoDB(){
    if(mongoClient) {
        return { mongoClient }
    }

    try {
        mongoClient = await new MongoClient(uri, options).connect();
        console.log("Just connected");
        return { mongoClient }
    } catch (error) {
        console.log(error);
    }
}