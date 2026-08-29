import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'activities' },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

export const Activity = model<ActivityDocument>('Activity', activitySchema);
