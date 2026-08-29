# Divine Bliss Furnitures

React/Vite site with a server-backed callback-request workflow.

## Contact request setup

1. Copy `.env.example` to `.env`.
2. Set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `OWNER_EMAIL`. The Gmail account
   needs 2-Step Verification and a dedicated App Password. Do not put these
   values in any `VITE_` variable because those are exposed to browsers.
3. Optionally set Abstract API email and phone keys for third-party
   deliverability/line-status checks. Without them, email syntax and MX records
   plus Indian mobile metadata are still validated.
4. Set `CONTACT_WORKBOOK_PATH` to persistent storage in production. Successful
   requests are appended to the `Contact Requests` sheet in that workbook.

The included owner email is a temporary responsive HTML template and can be
replaced in `server/services/ownerNotification.js` when the final template is
provided.

## Commands

```bash
npm run dev       # Vite client + API server
npm run build     # Production client build
npm start         # API server and built client
npm test          # Validation/API/workbook tests
npm run lint
```

## Verification boundary

The browser performs immediate validation and only accepts a 10-digit Indian
mobile number. The server repeats every check. `libphonenumber-js` verifies
that the number matches allocated numbering metadata, and MX lookup verifies
that an email domain receives mail. These checks do not prove that a person
owns a mailbox or phone. Ownership proof requires OTP/confirmation; stronger
non-OTP deliverability and active-line signals require the optional paid API.
