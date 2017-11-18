import React from 'react';
import Navigation from './Navigation.jsx';
import MainContainer from './MainContainer.jsx';
import Footer from './Footer.jsx';

import './App.css';

export default class App extends React.Component {
	render () {
		return (
			<div>
				<Navigation />
				<MainContainer />
				<Footer />
			</div>
		)
	}
}
