import React from 'react';
import {
	Container
} from 'reactstrap';

import ListContainer from './ListContainer.jsx';
import PostForm from './PostForm.jsx';

import './MainContainer.css';

export default class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: {}
		};

		this.db = window.firebase.database();
		this.getList = this.getList.bind(this);
		this.getList();
	}

	getList() {
		this.db.ref('list').once('value').then((snapshot) => {
			const data = snapshot.val() || {};
			this.setState({
				list: data
			});
		});
	}

	render() {
		return (
			<Container className="MainContainer">
				<PostForm onPost={this.getList} />
				<hr />
				<ListContainer list={this.state.list} />
			</Container>
		)
	}
}
