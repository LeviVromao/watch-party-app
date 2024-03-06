import { config } from "dotenv"
config()

const nextAuthConfig = {
    secret: process.env.NEXTAUTH_SECRET
}

export default nextAuthConfig