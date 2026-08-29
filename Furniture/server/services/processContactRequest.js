import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  getCollectionLabel,
  normalizeContactValues,
  validateContactValues,
} from '../../src/utils/contactValidation.js';
import { ContactRequestError } from '../errors.js';
import { verifyEmailAddress, verifyPhoneNumber } from './contactVerification.js';
import { appendContactRequest } from './contactWorkbook.js';
import { sendOwnerNotification } from './ownerNotification.js';

const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultWorkbookPath = path.resolve(serverDirectory, '..', 'data', 'contact-requests.xlsx');
const ALLOWED_SOURCES = new Set(['contact-page', 'header-popup']);

export async function processContactRequest(
  payload,
  {
    verifyEmail = verifyEmailAddress,
    verifyPhone = verifyPhoneNumber,
    notifyOwner = sendOwnerNotification,
    appendRequest = appendContactRequest,
    workbookPath = process.env.CONTACT_WORKBOOK_PATH || defaultWorkbookPath,
  } = {},
) {
  const source = String(payload?.source ?? '');
  if (!ALLOWED_SOURCES.has(source)) {
    throw new ContactRequestError('Invalid form source.', { status: 400 });
  }

  const requireNote = source === 'contact-page';
  const values = normalizeContactValues(payload);
  const errors = validateContactValues(values, { requireNote });

  if (Object.keys(errors).length > 0) {
    throw new ContactRequestError('Please correct the highlighted fields.', { status: 422, errors });
  }

  const [emailVerification, phoneVerification] = await Promise.all([
    verifyEmail(values.email),
    verifyPhone(values.phone),
  ]);

  if (!emailVerification.valid) errors.email = emailVerification.message;
  if (!phoneVerification.valid) errors.phone = phoneVerification.message;
  if (Object.keys(errors).length > 0) {
    throw new ContactRequestError('Some details could not be verified.', { status: 422, errors });
  }

  const record = {
    requestId: randomUUID(),
    receivedAt: new Date().toISOString(),
    name: values.name,
    email: values.email,
    phone: `+91 ${values.phone}`,
    collection: getCollectionLabel(values.collection),
    note: values.note,
    source,
    emailVerification: emailVerification.summary,
    phoneVerification: phoneVerification.summary,
    notificationStatus: 'Not attempted',
  };

  try {
    record.notificationStatus = await notifyOwner(record);
  } catch {
    record.notificationStatus = 'Failed';
  }

  await appendRequest(record, workbookPath);
  return record;
}
