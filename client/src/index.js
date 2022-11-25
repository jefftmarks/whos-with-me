import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ActiveUserProvider } from './context/active_user';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<ActiveUserProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ActiveUserProvider>
  </React.StrictMode>
);
