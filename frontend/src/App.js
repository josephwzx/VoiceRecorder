import React, { useState } from 'react';
import TextArea from './components/TextArea';
import RecorderControl from './components/RecorderControl';
import AudioPlayer from './components/AudioPlayer';
import { RecordingsProvider } from './components/RecordingsContext';

export default function App() {
  const [status, setStatus] = useState('Click to start recording');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);

  const handleNewRecording = (audioBlob, audioUrl) => {
    setRecordings(prevRecordings => [...prevRecordings, { audioBlob, audioUrl }]);
  };

  return (
    <RecordingsProvider>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white">
        {/* Header */}
        <div style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000
        }} className="w-full p-4 bg-black">
          <h1 className="text-3xl font-bold text-white text-center">Voice Recorder</h1>
        </div>

        <div className="mt-24"> 
          {/* Controls Container */}
          <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-sm p-4 rounded-lg bg-white shadow-md">
            <TextArea recordingStatus={status} recordingTime={recordingTime} />
            <RecorderControl
              onRecordingsChange={handleNewRecording}
              onStatusChange={setStatus}
              setRecordingTime={setRecordingTime}
            />
          </div>
        </div>

        {/* Recordings Section */}
        <div className="w-full max-w-sm mt-8 bg-white ml-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">History Recordings</h2>
          <AudioPlayer recordings={recordings} />
        </div>
      </div>
    </RecordingsProvider>
  );
}
