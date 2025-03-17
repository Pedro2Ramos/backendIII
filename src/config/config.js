import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    env: process.env.NODE_ENV || 'development'
}; 