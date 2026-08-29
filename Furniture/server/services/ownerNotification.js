import nodemailer from 'nodemailer';

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function buildOwnerEmail(record) {
  const note = record.note || 'No note supplied (header popup).';
  const source = record.source === 'contact-page' ? 'Contact page' : 'Header contact popup';

  return {
    subject: `Callback request from ${record.name}`,
    text: [
      'A customer would like to connect.',
      '',
      `Name: ${record.name}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone}`,
      `Collection: ${record.collection}`,
      `Note: ${note}`,
      `Source: ${source}`,
      `Received: ${record.receivedAt}`,
      `Request ID: ${record.requestId}`,
    ].join('\n'),
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f0ede8;color:#181818;font-family:Arial,sans-serif">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f0ede8;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #ddd5cd">
          <tr><td style="padding:26px 30px;background:#843a1d;color:#ffffff">
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase">Divine Bliss Furnitures</p>
            <h1 style="margin:0;font-size:24px;font-weight:500">New callback request</h1>
          </td></tr>
          <tr><td style="padding:28px 30px">
            <p style="margin:0 0 22px;line-height:1.6">A customer submitted the ${escapeHtml(source.toLowerCase())} and would like to connect.</p>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="border-collapse:collapse;font-size:14px">
              <tr><td style="width:120px;border-bottom:1px solid #eee;color:#6b625d">Name</td><td style="border-bottom:1px solid #eee"><strong>${escapeHtml(record.name)}</strong></td></tr>
              <tr><td style="border-bottom:1px solid #eee;color:#6b625d">Email</td><td style="border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(record.email)}" style="color:#843a1d">${escapeHtml(record.email)}</a></td></tr>
              <tr><td style="border-bottom:1px solid #eee;color:#6b625d">Phone</td><td style="border-bottom:1px solid #eee"><a href="tel:${escapeHtml(record.phone)}" style="color:#843a1d">${escapeHtml(record.phone)}</a></td></tr>
              <tr><td style="border-bottom:1px solid #eee;color:#6b625d">Collection</td><td style="border-bottom:1px solid #eee">${escapeHtml(record.collection)}</td></tr>
              <tr><td style="border-bottom:1px solid #eee;color:#6b625d">Note</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(note)}</td></tr>
              <tr><td style="color:#6b625d">Received</td><td>${escapeHtml(record.receivedAt)}</td></tr>
            </table>
            <p style="margin:24px 0 0;color:#8a817b;font-size:11px">Request ID: ${escapeHtml(record.requestId)}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  };
}

export async function sendOwnerNotification(
  record,
  {
    gmailUser = process.env.GMAIL_USER,
    gmailAppPassword = process.env.GMAIL_APP_PASSWORD,
    ownerEmail = process.env.OWNER_EMAIL || process.env.GMAIL_USER,
    createTransport = nodemailer.createTransport,
  } = {},
) {
  if (!gmailUser || !gmailAppPassword || !ownerEmail) return 'Not configured';

  const transporter = createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailAppPassword },
  });
  const message = buildOwnerEmail(record);

  await transporter.sendMail({
    from: `Divine Bliss Website <${gmailUser}>`,
    to: ownerEmail,
    replyTo: record.email,
    ...message,
  });

  return 'Sent';
}
