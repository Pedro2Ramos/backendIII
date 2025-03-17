import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true,
        enum: ['dog', 'cat', 'bird']
    },
    age: {
        type: Number,
        required: true
    },
    adopted: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    image: String
}, { timestamps: true });

export const PetModel = mongoose.model('Pet', petSchema); 