import { connectToMongoDB } from "@/lib/mongoDb";

export default async function handler(req, res) {

    const { mongoClient } = await connectToMongoDB()
    const docs = await mongoClient.db("test").collection("users").find({}).toArray();
    const ids = docs.map(user => user._id.toString());

    res.json({ids});

}