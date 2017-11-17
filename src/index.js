import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

// Initialize Firebase
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: '',
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};
window.firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
