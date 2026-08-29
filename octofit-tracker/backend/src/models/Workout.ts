import { Schema, model, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'workouts' },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
