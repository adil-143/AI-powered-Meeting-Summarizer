import React, { useMemo, useState } from 'react';
import { sendEmail } from '../api';

export default function ShareForm({ summary }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState(() => {
    const d = new Date();
    const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `Meeting Summary — ${date}`;
  });
  const [sending, setSending] = useState(false);

  const html = useMemo(() => {
    const safe = summary
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');
    return `
      <div style="font-family:system-ui,Segoe UI,Arial;line-height:1.5;color:#111">
        ${safe}
        <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
        <div style="font-size:12px;color:#666">Sent via AI Meeting Notes Summarizer</div>
      </div>
    `;
  }, [summary]);

  const onSend = async () => {
    if (!to.trim()) { alert('Enter at least one recipient email.'); return; }
    if (!summary.trim()) { alert('Summary is empty.'); return; }
    try {
      setSending(true);
      await sendEmail({ to, subject, html, text: summary });
      alert('Email sent!');
    } catch (e) {
      console.error(e);
      alert('Email failed. Check server logs and SMTP credentials.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card">
      <h2>4) Share via email</h2>
      <input
        type="text"
        placeholder="Recipients (comma-separated) e.g., a@x.com, b@y.com"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <div style={{ height: 8 }} />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <div style={{ height: 12 }} />
      <button className="btn-success" onClick={onSend} disabled={sending}>
        {sending ? 'Sending…' : 'Send Email'}
      </button>
      <div className="small" style={{ marginTop: 8 }}>
        Uses your server-side SMTP settings. For testing, try Mailtrap or Gmail (app password).
      </div>
    </div>
  );
}
