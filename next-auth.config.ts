import { config } from "dotenv"
config()

const nextAuthConfig = {
    secret: process.env.secret
}

export default nextAuthConfig