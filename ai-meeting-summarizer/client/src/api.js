import axios from 'axios';

// Point this to your server (matches server/.env.example CORS_ORIGIN)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export async function summarize(transcriptText, instruction) {
  const { data } = await api.post('/api/summarize', { transcriptText, instruction });
  return data;
}

export async function sendEmail({ to, subject, html, text }) {
  const { data } = await api.post('/api/send-email', { to, subject, html, text });
  return data;
}
