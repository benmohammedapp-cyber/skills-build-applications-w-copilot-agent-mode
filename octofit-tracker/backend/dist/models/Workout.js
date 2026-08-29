import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'workouts' });
export const Workout = model('Workout', workoutSchema);
