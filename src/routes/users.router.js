import { Router } from 'express';
import { UserModel } from '../models/user.model.js';
import { passportCall, authorization } from '../middlewares/auth.js';

const router = Router();


router.get('/', passportCall('jwt'), authorization('admin'), async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.json({
            status: 'success',
            payload: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});


router.get('/:id', passportCall('jwt'), async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                status: 'error',
                error: 'User not found'
            });
        }
        res.json({
            status: 'success',
            payload: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});


router.put('/:id', passportCall('jwt'), async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        delete updateData.role;
        delete updateData.password;

        const user = await UserModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                error: 'User not found'
            });
        }

        res.json({
            status: 'success',
            payload: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

router.delete('/:id', passportCall('jwt'), async (req, res) => {
    try {
        const { id } = req.params;
        
        if (req.user.role !== 'admin' && req.user.id !== id) {
            return res.status(403).json({
                status: 'error',
                error: 'Not authorized'
            });
        }

        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                error: 'User not found'
            });
        }

        res.json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

export default router;