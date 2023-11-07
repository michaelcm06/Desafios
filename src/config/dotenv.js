import dotenv from 'dotenv'

dotenv.config({path:"./.env", override:true})

export const config={
    PORT:process.env.PORT||8080,
    MONGO_URL:process.env.MONGO_URL,
    DB_NAME:process.env.DB_NAME
}