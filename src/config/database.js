import mongoose from 'mongoose';
import { config } from './config.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        logger.info('Connected to MongoDB Atlas');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}; 