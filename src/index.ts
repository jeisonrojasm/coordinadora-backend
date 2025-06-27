// src/index.ts
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.send('Hello from Dockerized Express + TS!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
