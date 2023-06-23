import { connectToMongoDB } from "@/lib/mongoDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();

export default async function handler(req, res) {
  const { email, password } = req.body;

    try {

      const { mongoClient } = await connectToMongoDB();
      const user = await mongoClient.db("test").collection("users").findOne({email});
      
      if(!user) return res.json({"error": "Senha ou/ email não cadastrados."});

      bcrypt.compare(password, user.password, (err, isValid) => {

        if(err) return res.json({"error": err});

        if(isValid && user) {

          const token = jwt.sign(

            {id: user._id, email: user.email}, 
            process.env.SECRET,

          );
          
          return res.json({"user": user, "token": token});

        } 

          res.json({"error": "Senha não cadastrada."});

      });

    } catch (error) {

      res.json({"error": error});

    }
}
