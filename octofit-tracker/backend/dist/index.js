import express from 'express';
import mongoose from 'mongoose';
const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB at', MONGODB_URI);
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Backend listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
startServer();
