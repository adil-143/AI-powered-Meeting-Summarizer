import React, { useRef } from 'react';

export default function SummaryEditor({ summary, setSummary, onClear }) {
  const editorRef = useRef(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      alert('Summary copied to clipboard.');
    } catch {
      alert('Copy failed.');
    }
  };

  return (
    <div className="card">
      <h2>3) Edit your summary</h2>
      <textarea
        ref={editorRef}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Your AI-generated summary will appear here. Edit as needed."
        style={{ minHeight: 240 }}
      />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button className="btn-secondary" onClick={copyToClipboard}>Copy</button>
        <button className="btn-danger" onClick={onClear}>Clear</button>
      </div>
    </div>
  );
}
