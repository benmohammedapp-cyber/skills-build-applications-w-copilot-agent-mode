import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.set('trust proxy', true);

app.use(express.json());

const users = [
  { id: '1', name: 'Ava Johnson', email: 'ava@example.com', role: 'captain', score: 240 },
  { id: '2', name: 'Leo Martinez', email: 'leo@example.com', role: 'member', score: 210 },
  { id: '3', name: 'Nia Patel', email: 'nia@example.com', role: 'member', score: 198 },
];

const teams = [
  { id: '1', name: 'Trail Blazers', members: ['1', '2'], sport: 'Running' },
  { id: '3', name: 'Summit Squad', members: ['3'], sport: 'Cycling' },
];

const activities = [
  { id: '1', userId: '1', type: 'Run', duration: 32, calories: 280, date: '2026-08-29' },
  { id: '2', userId: '2', type: 'Ride', duration: 45, calories: 310, date: '2026-08-28' },
  { id: '3', userId: '3', type: 'Strength', duration: 28, calories: 220, date: '2026-08-27' },
];

const workouts = [
  { id: '1', name: 'HIIT Cardio', difficulty: 'Intermediate', duration: 25 },
  { id: '2', name: 'Core Stability', difficulty: 'Beginner', duration: 20 },
  { id: '3', name: 'Trail Endurance', difficulty: 'Advanced', duration: 40 },
];

function sendCollection<T>(res: Response, collection: T[], message: string) {
  res.json({
    message,
    count: collection.length,
    baseUrl,
    results: collection,
  });
}

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    baseUrl,
    endpoints: [
      '/api/health',
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
    ],
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    baseUrl,
  });
});

app.get(['/api/users', '/api/users/'], (_req: Request, res: Response) => {
  sendCollection(res, users, 'Users retrieved successfully');
});

app.get(['/api/teams', '/api/teams/'], (_req: Request, res: Response) => {
  sendCollection(res, teams, 'Teams retrieved successfully');
});

app.get(['/api/activities', '/api/activities/'], (_req: Request, res: Response) => {
  sendCollection(res, activities, 'Activities retrieved successfully');
});

app.get(['/api/leaderboard', '/api/leaderboard/'], (_req: Request, res: Response) => {
  const leaderboard = [...users]
    .sort((first, second) => second.score - first.score)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  sendCollection(res, leaderboard, 'Leaderboard retrieved successfully');
});

app.get(['/api/workouts', '/api/workouts/'], (_req: Request, res: Response) => {
  sendCollection(res, workouts, 'Workouts retrieved successfully');
});

app.post(['/api/users', '/api/users/'], (req: Request, res: Response) => {
  const user = {
    id: String(Date.now()),
    ...req.body,
  };

  users.push(user);
  res.status(201).json({ message: 'User created successfully', user, baseUrl });
});

app.post(['/api/teams', '/api/teams/'], (req: Request, res: Response) => {
  const team = {
    id: String(Date.now()),
    ...req.body,
  };

  teams.push(team);
  res.status(201).json({ message: 'Team created successfully', team, baseUrl });
});

app.post(['/api/activities', '/api/activities/'], (req: Request, res: Response) => {
  const activity = {
    id: String(Date.now()),
    ...req.body,
  };

  activities.push(activity);
  res.status(201).json({ message: 'Activity created successfully', activity, baseUrl });
});

app.post(['/api/workouts', '/api/workouts/'], (req: Request, res: Response) => {
  const workout = {
    id: String(Date.now()),
    ...req.body,
  };

  workouts.push(workout);
  res.status(201).json({ message: 'Workout created successfully', workout, baseUrl });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB at', MONGODB_URI);
  } catch (error) {
    console.warn('MongoDB is not available; continuing with in-memory data for API testing.', error);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend listening on ${baseUrl}`);
  });
}

startServer();
