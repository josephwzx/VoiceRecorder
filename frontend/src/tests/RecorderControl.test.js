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
    render(<RecorderControl />);
    expect(screen.getByText('Start Recording')).toBeTruthy();
  });

  test('starts recording when start button is clicked', async () => {
    render(<RecorderControl />);
    const startButton = screen.getByText('Start Recording');

    fireEvent.click(startButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(startButton.textContent).toBe('Stop Recording');
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(MediaRecorder).toHaveBeenCalled();
  });

  test('stops recording when stop button is clicked', async () => {
    const mockOnStatusChange = jest.fn();
    render(<RecorderControl onStatusChange={mockOnStatusChange} />);
    const startButton = screen.getByText('Start Recording');
  
    fireEvent.click(startButton);
  
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
  
    const stopButton = screen.getByText('Stop Recording');
    fireEvent.click(stopButton);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
  
    expect(stopButton.textContent).toBe('Start Recording');
    expect(mockMediaRecorderInstance.stop).toHaveBeenCalled();
    expect(mockOnStatusChange).toHaveBeenCalledWith('Upload successfully, click to record another');
  });
});
