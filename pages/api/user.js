import { connectToMongoDB } from "@/lib/mongoDb";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default async function handler(req, res) {
    const token = req.headers.authorization;
    if(token){
        const { mongoClient } = await connectToMongoDB();
        const { email } = jwt.verify(token, process.env.SECRET);
        const user = await mongoClient.db("test").collection("users").findOne({email});
        res.json({"name": user.username, "id": user._id});
    } else {
        res.status(403)
    }   
}