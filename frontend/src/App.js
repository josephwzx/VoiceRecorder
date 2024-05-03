import React, { useState } from 'react';
import TextArea from './components/TextArea';
import RecorderControl from './components/RecorderControl';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [status, setStatus] = useState('Click to recording');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);

  const handleNewRecording = (audioBlob, audioUrl) => {
    setRecordings(prevRecordings => [...prevRecordings, { audioBlob, audioUrl }]);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Voice Recorder</h1>
        <TextArea recordingStatus={status} recordingTime={recordingTime} />
        <RecorderControl
          onRecordingsChange={handleNewRecording}
          onStatusChange={setStatus}
          setRecordingTime={setRecordingTime}
        />
        <AudioPlayer recordings={recordings} />
      </div>  
    </div>
  );
}
