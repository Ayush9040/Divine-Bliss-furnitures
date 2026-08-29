import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import ExcelJS from 'exceljs';

const SHEET_NAME = 'Contact Requests';
const COLUMNS = [
  { header: 'Request ID', key: 'requestId', width: 38 },
  { header: 'Received At', key: 'receivedAt', width: 25 },
  { header: 'Name', key: 'name', width: 24 },
  { header: 'Email', key: 'email', width: 32 },
  { header: 'Phone', key: 'phone', width: 18 },
  { header: 'Collection', key: 'collection', width: 18 },
  { header: 'Note', key: 'note', width: 52 },
  { header: 'Form Source', key: 'source', width: 18 },
  { header: 'Email Verification', key: 'emailVerification', width: 36 },
  { header: 'Phone Verification', key: 'phoneVerification', width: 42 },
  { header: 'Owner Notification', key: 'notificationStatus', width: 24 },
];

let workbookQueue = Promise.resolve();

function excelSafe(value) {
  const text = String(value ?? '');
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeRequest(record, filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Divine Bliss Furnitures';
  workbook.modified = new Date();

  if (await fileExists(filePath)) await workbook.xlsx.readFile(filePath);

  let worksheet = workbook.getWorksheet(SHEET_NAME);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(SHEET_NAME, {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
  }

  worksheet.columns = COLUMNS;
  worksheet.autoFilter = { from: 'A1', to: 'K1' };
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF843A1D' },
  };
  worksheet.getRow(1).alignment = { vertical: 'middle' };

  const row = worksheet.addRow({
    ...record,
    name: excelSafe(record.name),
    email: excelSafe(record.email),
    // This value is server-normalized and ExcelJS stores strings as strings.
    phone: String(record.phone),
    collection: excelSafe(record.collection),
    note: excelSafe(record.note),
  });
  row.alignment = { vertical: 'top', wrapText: true };

  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

export function appendContactRequest(record, filePath) {
  const queuedWrite = workbookQueue.then(() => writeRequest(record, filePath));
  workbookQueue = queuedWrite.catch(() => undefined);
  return queuedWrite;
}
