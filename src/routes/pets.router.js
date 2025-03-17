import { Router } from 'express';
import { getAllPets, getPetById, createPet, updatePet, deletePet } from '../controllers/pets.controller.js';
import { passportCall } from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', passportCall('jwt'), createPet);
router.put('/:id', passportCall('jwt'), updatePet);
router.delete('/:id', passportCall('jwt'), deletePet);

export default router; 