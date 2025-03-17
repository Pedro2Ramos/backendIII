import { Router } from 'express';
import { faker } from '@faker-js/faker';

const router = Router();

// Generar una mascota mock
const generatePet = () => {
    return {
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        specie: faker.helpers.arrayElement(['dog', 'cat', 'bird']),
        age: faker.number.int({ min: 1, max: 15 }),
        adopted: faker.datatype.boolean(),
        owner: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        image: faker.image.url()
    };
};

// Ruta para generar mascotas mock
router.get('/pets', (req, res) => {
    const count = parseInt(req.query.count) || 100;
    const pets = Array.from({ length: count }, generatePet);
    
    res.json({
        status: 'success',
        payload: pets
    });
});

export default router; 