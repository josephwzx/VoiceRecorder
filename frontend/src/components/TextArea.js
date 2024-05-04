import React from 'react';

function TextArea({ recordingStatus, recordingTime }) {
  const displayText = recordingStatus.includes("Recording")
    ? `${recordingStatus} (${recordingTime}s)`
    : recordingStatus;

  return (
    <div className=" mb-4 rounded-md">
        {displayText}
    </div>
  );
}

export default TextArea;
