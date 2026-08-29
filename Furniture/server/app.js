import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { ContactRequestError } from './errors.js';
import { processContactRequest } from './services/processContactRequest.js';

export function createApp({ processor = processContactRequest, enableRateLimit = true } = {}) {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json({ limit: '20kb' }));

  if (enableRateLimit) {
    app.use('/api/contact-requests', rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 8,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { message: 'Too many callback requests. Please wait a few minutes and try again.' },
    }));
  }

  app.post('/api/contact-requests', async (request, response, next) => {
    try {
      const record = await processor(request.body);
      response.status(201).json({
        message: 'Thank you. Our team will call you shortly.',
        requestId: record.requestId,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, request, response, next) => {
    if (response.headersSent) return next(error);

    if (error instanceof ContactRequestError) {
      return response.status(error.status).json({ message: error.message, errors: error.errors });
    }
    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({ message: 'The request body is not valid JSON.' });
    }

    console.error('Contact request failed:', error instanceof Error ? error.message : error);
    return response.status(500).json({ message: 'We could not save your request. Please try again.' });
  });

  return app;
}
