import { PetModel } from '../models/pet.model.js';

export const getAllPets = async (req, res) => {
    try {
        const pets = await PetModel.find().populate('owner', 'first_name last_name email');
        res.json({
            status: 'success',
            payload: pets
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const getPetById = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await PetModel.findById(id).populate('owner', 'first_name last_name email');
        
        if (!pet) {
            return res.status(404).json({
                status: 'error',
                error: 'Pet not found'
            });
        }

        res.json({
            status: 'success',
            payload: pet
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const createPet = async (req, res) => {
    try {
        const petData = req.body;
        const pet = await PetModel.create(petData);
        
        res.status(201).json({
            status: 'success',
            payload: pet
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const pet = await PetModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('owner', 'first_name last_name email');

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                error: 'Pet not found'
            });
        }

        res.json({
            status: 'success',
            payload: pet
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
};

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await PetModel.findByIdAndDelete(id);

        if (!pet) {
            return res.status(404).json({
                status: 'error',
                error: 'Pet not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Pet deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
}; 