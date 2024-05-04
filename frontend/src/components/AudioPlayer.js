import React, { useEffect } from 'react';
import { useRecordings } from './RecordingsContext';
import { IconButton } from '@material-tailwind/react';

function AudioPlayer() {
  const { recordings, fetchRecordings, deleteRecording } = useRecordings();

  useEffect(() => {
      fetchRecordings();
  }, []);

  return (
    <div>
      {recordings.map((recording, index) => (
        <div key={index} className="mt-4">
          <p>Recording time: {recording.timestamp}</p>
          <div className="flex items-center">
            <audio controls src={recording.audioUrl} className="mr-4" data-testid="audio-element"/>
            <IconButton
              onClick={() => deleteRecording(recording.filename)}
              aria-label="Delete recording"
            >
              <i className="fas fa-trash" />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AudioPlayer;
