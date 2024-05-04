import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { RecordingsProvider, useRecordings } from '../components/RecordingsContext';
import '@testing-library/jest-dom';

const ConsumerComponent = () => {
  const { recordings, fetchRecordings, deleteRecording } = useRecordings();
  
  return (
    <div>
      {recordings.map((rec, index) => (
        <div key={index}>
          <span>{rec.filename}</span>
          <span>{rec.audioUrl}</span>
          <span>{rec.timestamp}</span>
        </div>
      ))}
      <button onClick={fetchRecordings}>Fetch Recordings</button>
      <button onClick={() => deleteRecording('test.wav')}>Delete Recording</button>
    </div>
  );
};

describe('RecordingsProvider', () => {
    beforeAll(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        })
      );
    });
  
    beforeEach(() => {
      fetch.mockClear();
    });
  
    afterAll(() => {
      jest.restoreAllMocks();
    });
  
    test('fetches recordings and updates the context', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(['recording-2021-01-01T12:00:00.wav'])
      });
  
      render(
        <RecordingsProvider>
          <ConsumerComponent />
        </RecordingsProvider>
      );
  
      await act(async () => {
        screen.getByText('Fetch Recordings').click();
      });
  
      expect(screen.getByText('2021-01-01 12:00:00')).toBeInTheDocument();
    });
});
