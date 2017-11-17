import React from 'react';
import {
	Container
} from 'reactstrap';

import './ListContainer.css';
import PostForm from './PostForm.jsx';

export default class ListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};

		this.getList = this.getList.bind(this);
		this.handlePost = this.handlePost.bind(this);
		this.getList();
	}

	getList() {
		//
	}

	handlePost() {
		console.log('ssssss');
	}
	
	render() {
		return (
			<Container className="ListContainer">
				<PostForm onPost={this.handlePost} />
			</Container>
		)
	}
}
