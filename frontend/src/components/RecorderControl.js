import React, { useState, useRef } from 'react';
import { Button } from '@material-tailwind/react';

function RecorderControl({ onRecordingsChange, onStatusChange, setRecordingTime }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const handleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
      onStatusChange('Upload successfully, click to record another');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
        onStatusChange('Recording');
        setRecordingTime(0);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime(prevTime => prevTime + 1);
        }, 1000);

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          onRecordingsChange(audioBlob, audioUrl);
          await uploadRecording(audioBlob);
        });
      } catch (error) {
        console.error('Error accessing your microphone', error);
      }
    }
  };

  const uploadRecording = async (audioBlob) => {
    const formData = new FormData();
    const date = new Date();
    const timestamp = date.toISOString().replace(/:/g, '-').replace(/\./g, '-');
    const filename = `recording-${timestamp}.wav`;
    formData.append('file', audioBlob, filename);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/recordings', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Upload successful:', result.message);
      } else {
        console.error('Upload failed:', result.error);
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <Button
      onClick={handleRecording}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </Button>
  );
}

export default RecorderControl;
