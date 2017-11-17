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

class Item extends React.Component {
	render() {
		return (
			<Col className="mb-2" xs={12} data-id={this.props.k}>
				<Card>
					<CardImg top width="100%" src={this.props.url} alt="" />
					<CardBody>
						<CardTitle>{this.props.name}</CardTitle>
						<Badge color="info" pill>{this.props.dept}</Badge><br />
						{ this.props.steal &&
							[<small key={0}><Badge color="danger" pill>偷來的</Badge></small>, <br key={1} />]
						}
						<small><i className="fa fa-map-marker" aria-hidden="true"></i> {this.props.freeTime}</small>
						<CardText style={{whiteSpace: 'pre-line'}}>{this.props.desc}</CardText>
					</CardBody>
				</Card>
			</Col>
		)
	}
}

export default class ListContainer extends React.Component {
	componentWillReceiveProps() {
		!!window.reviewListBricks && window.reviewListBricks.destroy();
	}

	componentDidUpdate() {
		window.reviewListBricks = new window.Bricklayer(document.querySelector('.bricklayer'));
	}

	render() {
		return (
			<Row className="bricklayer">
				{
					Object.keys(this.props.list).map((key, i) => {
						return <Item key={key} k={key} { ...JSON.parse(this.props.list[key]) }/>
					})
				}
			</Row>
		)
	}
}
