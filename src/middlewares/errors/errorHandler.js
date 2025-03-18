import { logger } from '../../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);


    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            error: 'Unauthorized',
            details: err.message
        });
    }

    
    res.status(500).json({
        status: 'error',
        error: 'Internal Server Error',
        details: err.message
    });
}; 