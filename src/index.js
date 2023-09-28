import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UpdatedDataProvider } from './UpdatedDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UpdatedDataProvider>
        <App />
    </UpdatedDataProvider>
);