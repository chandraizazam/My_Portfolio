require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Create mail transporter using SMTP config from env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Contact endpoint
app.post('/api/contact',
  // Validation
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const toEmail = process.env.TO_EMAIL || 'chandraizazam@gmail.com';

    const mailOptions = {
      from: `${name} <${email}>`,
      to: toEmail,
      subject: `New Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: 'Email sent' });
    } catch (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
