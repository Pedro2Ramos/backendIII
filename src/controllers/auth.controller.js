import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                status: 'error',
                error: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            payload: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                error: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'error',
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                role: user.role
            },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).json({
            status: 'success',
            message: 'Logged in successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const current = async (req, res) => {
    res.json({
        status: 'success',
        payload: req.user
    });
}; 