export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);


    let statusCode = err.status || 500;
    let message = err.message || 'Error interno del servidor';
    let details = err.details || null;


    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Error de validación';
        details = err.details;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'No autorizado';
    } else if (err.name === 'NotFoundError' || err.status === 404) {
        statusCode = 404;
        message = 'Recurso no encontrado';
    }


    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        details,
        timestamp: new Date().toISOString()
    });
};


export const notFoundHandler = (req, res, next) => {
    const error = new Error('Ruta no encontrada: ${req.originalUrl}');
    error.status = 404;
    next(error);
};