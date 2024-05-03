import React from 'react';

function AudioPlayer({ recordings }) {
  return (
    <div>
      {recordings.map((recording, index) => (
        <div key={index} className="mt-2">
          <p>Recording {index + 1}</p>
          <audio controls src={recording.audioUrl} />
        </div>
      ))}
    </div>
  );
}

export default AudioPlayer;
