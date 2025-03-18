import { Router } from 'express';
import passport from 'passport';
import { login, register, current } from '../controllers/auth.controller.js';

const router = Router();

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, { session: false }, function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    error: info.messages ? info.messages : info.toString()
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
};

router.post('/register', register);
router.post('/login', login);
router.get('/current', passportCall('jwt'), current);

export default router; 