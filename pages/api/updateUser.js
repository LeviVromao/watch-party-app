import { connectToMongoDB } from "@/lib/mongoDb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

    const { image, id, name } = req.body;

    if( req.method === 'POST' ) {

        const _id = new ObjectId(`${id}`);

        const { mongoClient } = await connectToMongoDB();
        const db = mongoClient.db("test");
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({_id});


        if( name && image && user ) {
            const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            user.username = sanitizedName;
            user.picture = image;
            await usersCollection.updateOne(
                {_id: user._id},
                {$set: user}
            )

        } else if( name && !image && user ) {
            const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            user.username = sanitizedName;
            await usersCollection.updateOne(
                {_id: user._id},
                {$set: user}
            )


        } else if( image && !name && user ) {

            user.picture = image;
            await usersCollection.updateOne(
                {_id: user._id},
                {$set: user}
            )
        }

    } else {

        res.status(405).json({ Error: "Method not allowed" });
    
    }
    
}