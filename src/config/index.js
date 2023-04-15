import dotenv from "dotenv"

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/ecomm',
    JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN || "firstbackendapp",
    JWT_EXPIRY_TOKEN: process.env.JW_EXPIRY_TOKEN || "1d"
}

export default config;