# Contact Form Backend

This is a simple Node.js + Express backend that accepts POST requests from the website's contact form and sends emails using Nodemailer (SMTP).

## Setup

1. Copy `.env.example` to `.env` and fill in your SMTP credentials (or use a provider like SendGrid / Mailgun with SMTP settings).

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm run dev   # uses nodemon
# or
npm start
```

The server will run on the port defined in `.env` (default 3000).

## Endpoint

POST /api/contact

Body (JSON):
- name (string)
- email (string)
- message (string)

Response:
- 200 { success: true }
- 4xx validation errors
- 5xx server errors

## Notes

- For Gmail, enable 2FA and create an App Password, then set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the app password.
- If you deploy this publicly, make sure to secure the endpoint (rate limiting, captcha) to avoid abuse.

## Testing Locally

- Start the backend (default port 3000):

```
npm install
npm run dev
```

- The frontend will send POST requests to `/api/contact` on the same host. If you open `index.html` directly in the browser (file://), the requests will fail due to CORS/file origin issues; run a local static server (e.g., `npx http-server` or serve via VSCode Live Server) so both frontend and backend can communicate.

- Example curl request:

```
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Tester","email":"test@example.com","message":"Hi"}'
```
