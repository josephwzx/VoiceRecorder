import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from '../components/AudioPlayer';
import { useRecordings } from '../components/RecordingsContext';
import '@testing-library/jest-dom';

jest.mock('../components/RecordingsContext', () => ({
  useRecordings: jest.fn()
}));

describe('AudioPlayer', () => {
  const mockFetchRecordings = jest.fn();
  const mockDeleteRecording = jest.fn();
  const mockRecordings = [
    { timestamp: '2021-01-01 12:00:00', audioUrl: 'http://example.com/audio1.mp3', filename: 'audio1.mp3' },
    { timestamp: '2021-01-02 13:00:00', audioUrl: 'http://example.com/audio2.mp3', filename: 'audio2.mp3' }
  ];

  beforeEach(() => {
    useRecordings.mockReturnValue({
      recordings: mockRecordings,
      fetchRecordings: mockFetchRecordings,
      deleteRecording: mockDeleteRecording
    });
    jest.clearAllMocks();
  });

  test('calls fetchRecordings on mount', () => {
    render(<AudioPlayer />);
    expect(mockFetchRecordings).toHaveBeenCalledTimes(1);
  });

  test('renders the recordings correctly', () => {
    render(<AudioPlayer />);
    const audioElements = screen.getAllByTestId('audio-element');
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete recording' });
  
    expect(audioElements.length).toBe(mockRecordings.length);
    expect(deleteButtons.length).toBe(mockRecordings.length);
  
    mockRecordings.forEach((rec, index) => {
      expect(screen.getByText(`Recording time: ${rec.timestamp}`)).toBeInTheDocument();
      expect(audioElements[index]).toHaveAttribute('src', rec.audioUrl);
    });
  });

  test('calls deleteRecording with the right filename when delete button is clicked', async () => {
    render(<AudioPlayer />);
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete recording' });

    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteRecording).toHaveBeenCalledWith(mockRecordings[0].filename);
  });
});
