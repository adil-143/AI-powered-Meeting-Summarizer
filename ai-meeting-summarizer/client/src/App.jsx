import React, { useState } from 'react';
import UploadSection from './components/UploadSection.jsx';
import PromptBox from './components/PromptBox.jsx';
import SummaryEditor from './components/SummaryEditor.jsx';
import ShareForm from './components/ShareForm.jsx';
import { summarize } from './api';

export default function App() {
  const [transcriptText, setTranscriptText] = useState('');
  const [instruction, setInstruction] = useState('Summarize in bullet points for executives, include Action Items (owner, due date), Decisions, and Risks.');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const onGenerate = async () => {
    if (!transcriptText.trim()) { alert('Please paste or upload a transcript.'); return; }
    if (!instruction.trim()) { alert('Please enter an instruction.'); return; }
    try {
      setLoading(true);
      const { summary: out } = await summarize(transcriptText, instruction);
      setSummary(out || '');
    } catch (e) {
      console.error(e);
      alert('Failed to generate summary. Check your server and API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Meeting Notes Summarizer & Sharer</h1>
      <div className="row">
        <div>
          <UploadSection
            transcriptText={transcriptText}
            setTranscriptText={setTranscriptText}
          />
          <PromptBox
            instruction={instruction}
            setInstruction={setInstruction}
            onGenerate={onGenerate}
            loading={loading}
          />
        </div>
        <div>
          <SummaryEditor
            summary={summary}
            setSummary={setSummary}
            onClear={() => setSummary('')}
          />
          <ShareForm summary={summary} />
        </div>
      </div>
    </div>
  );
}
