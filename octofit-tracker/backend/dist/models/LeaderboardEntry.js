import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'leaderboard' });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
