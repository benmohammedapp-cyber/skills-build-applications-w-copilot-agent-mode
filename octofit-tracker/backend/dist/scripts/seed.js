import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Workout.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
        ]);
        const users = [
            { id: 'u1', name: 'Ava Johnson', email: 'ava@example.com', role: 'captain', score: 240 },
            { id: 'u2', name: 'Leo Martinez', email: 'leo@example.com', role: 'member', score: 210 },
            { id: 'u3', name: 'Nia Patel', email: 'nia@example.com', role: 'member', score: 198 },
            { id: 'u4', name: 'Omar Chen', email: 'omar@example.com', role: 'member', score: 176 },
        ];
        const teams = [
            { id: 't1', name: 'Trail Blazers', sport: 'Running', members: ['u1', 'u2'] },
            { id: 't2', name: 'Summit Squad', sport: 'Cycling', members: ['u3', 'u4'] },
        ];
        const activities = [
            { id: 'a1', userId: 'u1', type: 'Run', duration: 32, calories: 280, date: '2026-08-29' },
            { id: 'a2', userId: 'u2', type: 'Ride', duration: 45, calories: 310, date: '2026-08-28' },
            { id: 'a3', userId: 'u3', type: 'Strength', duration: 28, calories: 220, date: '2026-08-27' },
            { id: 'a4', userId: 'u4', type: 'Swim', duration: 24, calories: 190, date: '2026-08-26' },
        ];
        const workouts = [
            { id: 'w1', name: 'HIIT Cardio', difficulty: 'Intermediate', duration: 25 },
            { id: 'w2', name: 'Core Stability', difficulty: 'Beginner', duration: 20 },
            { id: 'w3', name: 'Trail Endurance', difficulty: 'Advanced', duration: 40 },
        ];
        const createdUsers = await User.insertMany(users);
        const createdTeams = await Team.insertMany(teams);
        const createdActivities = await Activity.insertMany(activities);
        const createdWorkouts = await Workout.insertMany(workouts);
        const leaderboard = [...createdUsers]
            .sort((first, second) => second.score - first.score)
            .map((user, index) => ({
            id: `lb${index + 1}`,
            userId: user.id,
            name: user.name,
            score: user.score,
            rank: index + 1,
        }));
        await LeaderboardEntry.insertMany(leaderboard);
        console.log('Seeded users:', createdUsers.length);
        console.log('Seeded teams:', createdTeams.length);
        console.log('Seeded activities:', createdActivities.length);
        console.log('Seeded workouts:', createdWorkouts.length);
        console.log('Seeded leaderboard entries:', leaderboard.length);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose.disconnect();
    }
}
seedDatabase();
