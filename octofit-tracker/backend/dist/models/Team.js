import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: [{ type: String, default: [] }],
    createdAt: { type: Date, default: Date.now },
}, { collection: 'teams' });
export const Team = model('Team', teamSchema);
