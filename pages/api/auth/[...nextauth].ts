import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { config } from "dotenv";
config()

if(!process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CLIENT_ID){
  throw new Error("An credentials is needed to continue")
}

export const authOptions = {
  providers : [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.secret
}

export default NextAuth(authOptions)