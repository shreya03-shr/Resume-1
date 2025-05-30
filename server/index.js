// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import client from 'prom-client';

import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import gptAtsAnalyzer from './routes/gptAtsAnalyzer.js';
import atsRoutes from './routes/ats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create a Registry
const register = new client.Registry();

// Optional default metrics
client.collectDefaultMetrics({ register });

// Custom metric (optional)
const httpRequestCounter = new client.Counter({
name: 'http_requests_total',
help: 'Total number of HTTP requests',
labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

// Middleware to count requests
app.use((req, res, next) => {
res.on('finish', () => {
httpRequestCounter.labels(req.method, req.path, res.statusCode.toString()).inc();
});
next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
res.set('Content-Type', register.contentType);
res.end(await register.metrics());
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/gpt-ats-analyzer', gptAtsAnalyzer);
app.use('/api/ats', atsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error("MongoDB Connection Error:", err));
