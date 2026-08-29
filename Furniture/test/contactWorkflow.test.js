import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import ExcelJS from 'exceljs';
import request from 'supertest';
import { createApp } from '../server/app.js';
import { ContactRequestError } from '../server/errors.js';
import { processContactRequest } from '../server/services/processContactRequest.js';
import { buildOwnerEmail } from '../server/services/ownerNotification.js';

const validRequest = {
  name: 'Asha Rao',
  email: 'asha.rao@gmail.com',
  phone: '9876543210',
  collection: 'sofas',
  note: 'I would like help choosing a sofa.',
  source: 'contact-page',
};

test('API returns field errors with a 422 response', async () => {
  const app = createApp({
    enableRateLimit: false,
    processor: async () => {
      throw new ContactRequestError('Please correct the highlighted fields.', {
        status: 422,
        errors: { email: 'Enter a valid email address.' },
      });
    },
  });

  const response = await request(app).post('/api/contact-requests').send({});
  assert.equal(response.status, 422);
  assert.equal(response.body.errors.email, 'Enter a valid email address.');
});

test('successful workflow notifies the owner and appends one Excel row', async () => {
  const tempDirectory = await mkdtemp(path.join(os.tmpdir(), 'divine-bliss-contact-'));
  const workbookPath = path.join(tempDirectory, 'requests.xlsx');
  let notificationRecord;

  const record = await processContactRequest(validRequest, {
    workbookPath,
    verifyEmail: async () => ({ valid: true, summary: 'Test email verified' }),
    verifyPhone: async () => ({ valid: true, summary: 'Test phone verified' }),
    notifyOwner: async (nextRecord) => {
      notificationRecord = nextRecord;
      return 'Sent';
    },
  });

  assert.equal(notificationRecord.email, validRequest.email);
  assert.equal(record.notificationStatus, 'Sent');

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const worksheet = workbook.getWorksheet('Contact Requests');
  assert.equal(worksheet.rowCount, 2);
  assert.equal(worksheet.getCell('C2').value, validRequest.name);
  assert.equal(worksheet.getCell('D2').value, validRequest.email);
  assert.equal(worksheet.getCell('E2').value, `+91 ${validRequest.phone}`);
  assert.equal(worksheet.getCell('F2').value, 'Sofas');
  assert.equal(worksheet.getCell('K2').value, 'Sent');
});

test('contact page requires a note while the header popup does not', async () => {
  await assert.rejects(
    processContactRequest({ ...validRequest, note: '' }, {
      verifyEmail: async () => ({ valid: true, summary: 'ok' }),
      verifyPhone: async () => ({ valid: true, summary: 'ok' }),
      notifyOwner: async () => 'Sent',
      appendRequest: async () => undefined,
    }),
    (error) => error.status === 422 && Boolean(error.errors.note),
  );

  await assert.doesNotReject(processContactRequest({
    ...validRequest,
    source: 'header-popup',
    note: '',
  }, {
    verifyEmail: async () => ({ valid: true, summary: 'ok' }),
    verifyPhone: async () => ({ valid: true, summary: 'ok' }),
    notifyOwner: async () => 'Sent',
    appendRequest: async () => undefined,
  }));
});

test('dummy HTML email escapes customer-supplied content', () => {
  const email = buildOwnerEmail({
    ...validRequest,
    requestId: 'request-1',
    receivedAt: '2026-08-22T00:00:00.000Z',
    name: '<img src=x onerror=alert(1)>',
  });

  assert.doesNotMatch(email.html, /<img src=x/);
  assert.match(email.html, /&lt;img/);
  assert.match(email.text, /A customer would like to connect/);
});
