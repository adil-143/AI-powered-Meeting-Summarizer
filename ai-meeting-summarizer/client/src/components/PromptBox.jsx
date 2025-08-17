import React from 'react';

export default function PromptBox({ instruction, setInstruction, onGenerate, loading }) {
  return (
    <div className="card">
      <h2>2) Add a custom instruction</h2>
      <input
        type="text"
        placeholder='e.g., "Summarize in bullet points for executives" or "Highlight only action items"'
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
      />
      <div style={{ height: 12 }} />
      <button onClick={onGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate Summary'}
      </button>
      <span style={{ marginLeft: 10 }} className="badge">Config</span>
      <span className="small" style={{ marginLeft: 8 }}>
        Uses a concise, structured style with Action Items, Decisions, Risks.
      </span>
    </div>
  );
}
