import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import RecorderControl from '../components/RecorderControl';
import { useRecordings } from '../components/RecordingsContext';

jest.mock('../components/RecordingsContext', () => ({
  useRecordings: jest.fn()
}));

describe('RecorderControl', () => {
  let mockFetchRecordings;
  let mockMediaRecorderInstance;

  beforeEach(() => {
    mockFetchRecordings = jest.fn();
    useRecordings.mockReturnValue({ fetchRecordings: mockFetchRecordings });

    navigator.mediaDevices = {
      getUserMedia: jest.fn().mockResolvedValue({})
    };

    mockMediaRecorderInstance = {
      start: jest.fn(),
      stop: jest.fn(),
      addEventListener: jest.fn()
    };
    global.MediaRecorder = jest.fn(() => mockMediaRecorderInstance);

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Upload successful' })
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders start recording button', () => {
    render(<RecorderControl onRecordingsChange={() => {}} onStatusChange={() => {}} setRecordingTime={() => {}} />);
    expect(screen.getByText('Start Recording')).toBeTruthy();
  });

  test('starts recording when start button is clicked', async () => {
    render(<RecorderControl onRecordingsChange={() => {}} onStatusChange={() => {}} setRecordingTime={() => {}} />);
    const startButton = screen.getByText('Start Recording');

    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(startButton.textContent).toBe('Stop Recording');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(MediaRecorder).toHaveBeenCalled();
  });

  it('changes button text to Stop Recording when clicked', async () => {
    render(<RecorderControl onRecordingsChange={() => {}} onStatusChange={() => {}} setRecordingTime={() => {}} />);
    const button = screen.getByText('Start Recording');
    fireEvent.click(button);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(button.textContent).toBe('Stop Recording');
  });
  
});
