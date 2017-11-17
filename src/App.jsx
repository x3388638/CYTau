import React from 'react';
import {
	Container,
	Row,
	Col
} from 'reactstrap';

import Navigation from './Navigation.jsx';
import ListContainer from './ListContainer.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
	render () {
		return (
			<div>
				<Navigation />
				<ListContainer />
				<Footer />
			</div>
		)
	}
}
