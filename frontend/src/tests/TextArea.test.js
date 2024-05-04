import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from '../components/TextArea';

describe('TextArea component', () => {
  test('displays recording status correctly when not recording', () => {
    render(<TextArea recordingStatus="Click to start recording" recordingTime={0} />);
    const statusElement = screen.getByText(/Click to start recording/i);
    expect(statusElement).toBeInTheDocument();
  });

  test('displays recording status correctly when recording', () => {
    render(<TextArea recordingStatus="Recording" recordingTime={10} />);
    const statusElement = screen.getByText(/Recording \(10s\)/i);
    expect(statusElement).toBeInTheDocument();
  });
});
