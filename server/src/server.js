
import 'dotenv/config';
import dns from 'node:dns';

import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import investigationRoutes from './routes/investigationRoutes.js';

// Fix MongoDB DNS resolution
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.disable('x-powered-by');

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok' })
);

app.use('/api/investigations', investigationRoutes);

app.use((req, res) =>
  res.status(404).json({
    message: 'This API route does not exist.'
  })
);

app.use((error, _req, res, _next) => {
  console.error(error);

  const status = error.status ||
    (error.name === 'ValidationError' ? 400 : 500);

  res.status(status).json({
    message: status >= 500
      ? (error.message || 'The case server encountered an unexpected error.')
      : error.message
  });
});

const port = Number(process.env.PORT) || 5000;

connectDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log(`AI Mystery Room API listening on port ${port}`)
    );
  })
  .catch((error) => {
    console.error(`Could not start API: ${error.message}`);
    process.exit(1);
  });
