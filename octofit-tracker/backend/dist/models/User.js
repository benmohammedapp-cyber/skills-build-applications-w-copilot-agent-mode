import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum: ['captain', 'member', 'coach'], default: 'member' },
    score: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'users' });
export const User = model('User', userSchema);
