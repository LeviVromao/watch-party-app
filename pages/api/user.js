import { connectToMongoDB } from '../../lib/mongoDb';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { ObjectId } from 'mongodb';
config();

export default async function handler(req, res) {
    const token = req.headers.authorization;
    const { id } = req.body;

    if(token && !id){

        const { mongoClient } = await connectToMongoDB();
        const { email } = jwt.verify(token, process.env.SECRET);
        const user = await mongoClient.db('test').collection('users').findOne({email});
        
        //if(!user.picture || !user.username) return res.json({id: user._id});
        
        res.json({ name: user.username, id: user._id, picture: user.picture });

    } else if(id && !token){

        const objectId = new ObjectId(`${id}`);
        const { mongoClient } = await connectToMongoDB();
        const user = await mongoClient.db('test').collection('users').findOne({_id: objectId});
        if(!user.picture || !user.username) return res.json({id: user._id});

        res.json({name: user.username, id: user._id, picture: user.picture});

    } else {

        res.status(403).json({Error: 'Your not authorized to acces this!!'})
    
    }
}