import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '4mb' }));

// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}); // Add you API key here

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/summarize', async (req, res) => {
  try {
    const { transcriptText, instruction } = req.body;
    if (!transcriptText || !instruction) {
      return res.status(400).json({ error: 'transcriptText and instruction are required' });
    }

    const system = `
You are an expert meeting notes assistant. Given a raw transcript and a user instruction, produce a clean, structured summary.
- Keep names, dates, and metrics.
- Use clear headings and bullet points.
- Include "Action Items" (owner + due date) when present.
- Include "Decisions" and "Risks/Blocks" sections if applicable.
- Be concise but complete.
    `.trim();

    const userPrompt = `
USER INSTRUCTION:
${instruction}

TRANSCRIPT:
${transcriptText}
    `.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      max_tokens: 900,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userPrompt }
      ]
    });

    const summary = completion.choices?.[0]?.message?.content || '';
    return res.json({ summary });
  } catch (err) {
    console.error('Summarization error:', err);
    return res.status(500).json({ error: 'Summarization failed' });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;
    if (!to || (!html && !text)) {
      return res.status(400).json({ error: 'to and (html or text) are required' });
    }

    const recipients = Array.isArraxxxy(to)
      ? to
      : String(to).split(',').map(s => s.trim()).filter(Boolean);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

    await transporter.sendMail({
      from,
      to: recipients,
      subject: subject || 'Meeting Summary',
      text: text || undefined,
      html: html || undefined
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
