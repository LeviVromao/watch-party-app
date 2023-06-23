import { connectToMongoDB } from '@/lib/mongoDb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

export default async function (req, res) {
    const { email, password } = req.body;

    if( req.method === 'POST' ) {
        const { mongoClient } = await connectToMongoDB();
        const db = mongoClient.db('test');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne( { email } );

        if( user ) return res.json( 
            { error: `Email ${ user.email } já cadastrado ` } 
        );

        try {
            const encryptedPass = await bcrypt.hash(password, 13);
            const newUser = {
                email,
                password: encryptedPass
            };

            const result = await usersCollection.insertOne(newUser);

            if( result.acknowledged ) {

                const token = jwt.sign(

                    {id: newUser._id, email: newUser.email}, 
                    process.env.SECRET,

                )

                res.status(201).json(
                    { 
                        message: 'Usuário criado com sucesso',
                        user: newUser,
                        token,
                    }
                );

            } else {

                res.status(500).json(
                    { error: 'Erro ao criar o usuário' }
                );

            }

        } catch (error) {
        
        }             
        
    }
}