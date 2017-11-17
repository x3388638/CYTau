import React from 'react'; 
import {
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavLink,
	NavItem
} from 'reactstrap';

import './Navigation.css';

export default class Navigation extends React.Component {
	constructor(props) {
	super(props);

	this.toggle = this.toggle.bind(this);
	this.state = {
	isOpen: false
	};
	}
	toggle() {
	this.setState({
	isOpen: !this.state.isOpen
	});
	}
	render () {
		return (
			<Navbar className="bg-dark" color="faded" dark expand="md">
				<NavbarBrand href={process.env.REACT_APP_BASE_URL}>
					<img id="logo" src={`${process.env.REACT_APP_BASE_URL}/logo.png`} alt="" height="35px"/> 那些年，我們一起穿的系外套
				</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink href="https://github.com/x3388638/CYTau" target="_blank">Github</NavLink>
					</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}
