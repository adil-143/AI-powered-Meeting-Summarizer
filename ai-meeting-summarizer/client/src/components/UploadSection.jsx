import React from 'react';

export default function UploadSection({ transcriptText, setTranscriptText }) {
  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic guard: accept plain text-like files
    const allowed = [
      'text/plain',
      'text/markdown',
      'application/octet-stream'
    ];
    if (!allowed.includes(file.type) && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      alert('Please upload a .txt or .md file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setTranscriptText(String(reader.result || ''));
    reader.onerror = () => alert('Could not read file.');
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <h2>1) Upload or paste transcript</h2>
      <input type="file" accept=".txt,.md,text/plain" onChange={onFile} />
      <div style={{ height: 10 }} />
      <textarea
        placeholder="Paste your raw meeting/call transcript here..."
        value={transcriptText}
        onChange={(e) => setTranscriptText(e.target.value)}
      />
      <div className="small">Tip: You can either upload a .txt/.md file or paste the text directly.</div>
    </div>
  );
}
