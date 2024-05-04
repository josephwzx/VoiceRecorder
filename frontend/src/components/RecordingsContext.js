import React, { createContext, useState, useContext } from 'react';
import config from '../config';

const RecordingsContext = createContext();

export const useRecordings = () => useContext(RecordingsContext);

export const RecordingsProvider = ({ children }) => {
    const [recordings, setRecordings] = useState([]);

    const fetchRecordings = async () => {
        const response = await fetch(`${config.API_URL}/api/recordings`);
        if (response.ok) {
            const files = await response.json();
            setRecordings(files.map(file => ({
                filename: file,
                audioUrl: `${config.API_URL}/api/recordings/${file}`,
                timestamp: file.replace('recording-', '')
                           .replace('.wav', '')
                           .replace('T', ' ')
                           .substring(0, 19)
                           .replace(/-/g, (match, offset) => offset === 13 ? ':' : '-')
            })));
        } else {
            console.error('Failed to fetch recordings');
        }
    };

    const deleteRecording = async (filename) => {
        console.log(filename);
        const response = await fetch(`${config.API_URL}/api/recordings/${filename}`, { method: 'DELETE' });
        if (response.ok) {
            fetchRecordings();
        } else {
            console.error('Failed to delete recording');
        }
    };

    return (
        <RecordingsContext.Provider value={{ recordings, setRecordings, fetchRecordings, deleteRecording }}>
            {children}
        </RecordingsContext.Provider>
    );
};
