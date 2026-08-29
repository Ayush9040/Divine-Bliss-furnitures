import 'dotenv/config';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createApp } from './app.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(currentDirectory, '..', 'dist');
const app = createApp();
const port = Number(process.env.PORT) || 3001;

if (existsSync(path.join(distDirectory, 'index.html'))) {
  app.use(express.static(distDirectory));
  app.use((request, response, next) => {
    if (request.method !== 'GET' || request.path.startsWith('/api/')) return next();
    return response.sendFile(path.join(distDirectory, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Divine Bliss server listening on http://localhost:${port}`);
});
