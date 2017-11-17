import React from 'react';
import {
	Row,
	Col,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Badge
} from 'reactstrap';
import $ from 'jquery';

import './ListContainer.css';

class Item extends React.Component {
	render() {
		return (
			<Col className="mb-2 Item" xs={12} data-id={this.props.k}>
				<span className="Item__btn-del" onClick={this.props.handleDel}>&times;</span>
				<Card>
					<a href={this.props.url} target="_blank">
						<CardImg top width="100%" src={this.props.url} alt="" />
					</a>
					<CardBody>
						<CardTitle>{this.props.name}</CardTitle>
						<Badge color="info" pill>{this.props.dept}</Badge><br />
						{ this.props.steal &&
							[<small key={0}><Badge color="danger" pill>偷來的</Badge></small>, <br key={1} />]
						}
						<small><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.freeTime}</small>
						<CardText className="Item__desc">{this.props.desc}</CardText>
					</CardBody>
				</Card>
			</Col>
		)
	}
}

export default class ListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.db = window.firebase.database();
		this.handleDel = this.handleDel.bind(this);
	}

	componentWillReceiveProps() {
		!!window.reviewListBricks && window.reviewListBricks.destroy();
	}

	componentDidUpdate() {
		window.reviewListBricks = new window.Bricklayer(document.querySelector('.bricklayer'));
	}

	handleDel(e) {
		const pass = prompt('請輸入刪文密碼：');
		if (!pass) {
			return;
		}

		if (window.sha3_512(pass).substring(0, 10) === $(e.target).parent('.Item').data('id').substring(0, 10)) {
			this.db.ref(`list/${$(e.target).parent('.Item').data('id')}`).remove().then(() => {
				this.props.onDel();
			});
		} else {
			alert('密碼錯囉');
		}
	}

	render() {
		return (
			<Row className="bricklayer">
				{
					Object.keys(this.props.list).map((key, i) => {
						return <Item key={key} k={key} { ...JSON.parse(this.props.list[key]) } handleDel={this.handleDel}/>
					})
				}
			</Row>
		)
	}
}
