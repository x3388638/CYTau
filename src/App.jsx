import React from 'react';
import {
	Container,
	Row,
	Col
} from 'reactstrap';

import Navigation from './Navigation.jsx';

export default class App extends React.Component {
	render () {
		return (
			<div>
				<Navigation />
			</div>
		)
	}
}
