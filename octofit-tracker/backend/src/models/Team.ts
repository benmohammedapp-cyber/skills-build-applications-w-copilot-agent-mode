import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: String, default: [] }],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'teams' },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const Team = model<TeamDocument>('Team', teamSchema);
