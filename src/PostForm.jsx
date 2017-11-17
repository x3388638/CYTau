import React from 'react';
import {
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Button
} from 'reactstrap';
import $ from 'jquery';

import './PostForm.css';

export default class PostForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			waiting: false
		};

		this.db = window.firebase.database();
		this.toggleOpen = this.toggleOpen.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleOpen() {
		this.setState((prevState) => ({
			open: !prevState.open
		}));
	}

	async handleSubmit() {
		const name = this.name.value;
		const dept = this.dept.value;
		const desc = this.desc.value;
		const freeTime = this.freeTime.value;
		const steal = $('.PostForm__input-steal').is(':checked');
		const file = $('#PostForm__file')[0].files[0];
		const pass = this.pass.value;
		const color = '#000000';
		if (!name || !dept || !desc || !freeTime || !file || !pass) {
			alert('請完整填寫你的系外套資料');
			return;
		}

		const validType = ['png', 'jpg', 'jpeg'];
		const fileType = file.name.split('.').pop().toLowerCase();
		if (!validType.includes(fileType)) {
			alert('請上傳 PNG 或 JPG 檔');
			return;
		}

		this.setState({
			waiting: true
		});

		// set localStorage to keep name
		localStorage.CYTau = localStorage.CYTau || '{}';
		const data = JSON.parse(localStorage.CYTau);
		data.name = name;
		data.color = color;
		localStorage.CYTau = JSON.stringify(data);

		// upload img to imgut
		const url = await this.uploadImg(file);

		const key = window.sha3_512(pass).substring(0, 10) + Date.now().toString(16).substring(7);
		this.db.ref(`list/${key}`).set(JSON.stringify({
			name,
			dept,
			desc,
			freeTime,
			steal,
			url,
			color
		})).then(() => {
			this.setState({
				waiting: false
			});

			this.props.onPost();
		});
	}

	uploadImg(file) {
		const fd = new FormData();
		fd.append('image', file);
		return new Promise((resolve, reject) => {
			$.ajax({
				url: 'https://api.imgur.com/3/image',
				type: 'post',
				dataType: 'json',
				cressDomain: true,
				processData: false,
				contentType: false,
				mimeType: 'multipart/form-data',
				headers: {
					authorization: 'Client-ID 8182977741f850e'
				},
				data: fd,
				success: function (data) {
					resolve(data.data.link);
				},
				error: function (jqXHR) {
					console.error(jqXHR);
				}
			})
		});
	}

	render() {
		const depts = ['教政系', '諮人系', '中文系', '國比系', '社工系', '外文系', '歷史系', '公行系', '東南亞系', '經濟系', '國企系', '資管系', '財金系', '資工系', '土木系', '電機系', '應化系', '應光系'];
		const quotationList = [
			'如果你有任何不滿或是疑問，歡迎你隨時找我。',
			'你約時間，我只要有空我一定會到。',
			'教育政策與行政學系 陳Ｏ晨留。',
			'你好，我是向你詢問的學生。',
			'我是電機系大一的學生',
			'沒有栽贓你是小偷，只是詢問你的來源而已。',
			'若想還原事情經過，歡迎你隨時私訊我或是找我約時間、地點',
			'我有空我一定奉陪 一定跟你個清楚 也歡迎當時在場的同學出面一起談',
			'需要我留自己的聯絡方式給你嗎?\\',
			'或是你覺得我有任何誹謗你的情形發生 歡迎提告',
			'難道你們系沒有自己的外套嗎?要穿一個外系的外套?',
			'我的限時動態不過是事情去分析',
			'不好意思同學，請問你是教政系的學生嗎?',
			'方便請問一下你這件外套的來源是哪裡嗎?',
			'你已經造成我的困擾了',
			'歡迎你把你方便的時間說出來，我們就可以把問題一次性的解決了。',
			'要公審我可以，但拿我私人的ig圖出來，不覺得其實有點不妥當嗎?',
			'如果有自己系的系外套，那為什麼不穿呢?',
			'如果你不找我的話，那我就開我可以的時間給你了。',
			'你自己來找我談或是我去找你?',
			'你的疑問請一次整合並歸納完整 我在一次回覆你 沒頭沒尾的很難去回應 你的疑問是?',
			'那是我的疑問而已?和能不能穿沒有關聯好嗎?'
		];
		const quot = quotationList[Math.floor(Math.random() * quotationList.length)];
		let name = '';
		if (localStorage.CYTau && JSON.parse(localStorage.CYTau) && JSON.parse(localStorage.CYTau).name) {
			name = JSON.parse(localStorage.CYTau).name;
		}

		return (
			<Row className="pt-4">
				<Col className="PostForm" xs={12}>
					<span className="PostForm__title" onClick={this.toggleOpen}>
						共享我的系外套 <i className={`fa fa-chevron-${this.state.open ? 'up' : 'down'}`} aria-hidden="true"></i>
					</span>
					<div className={`PostForm__formWrap ${!this.state.open ? 'close' : ''}`}>
						<Form>
							<FormGroup row>
								<Label for="PostForm__input-name" sm={2}>暱稱</Label>
								<Col sm={10}>
									<Input type="text" id="PostForm__input-name" placeholder="" defaultValue={name} innerRef={node => this.name = node} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__inpit-dept" sm={2}>外套系所</Label>
								<Col sm={10}>
									<Input type="select" id="PostForm__inpit-dept" innerRef={node => {this.dept = node}}>
										{
											depts.map((val, i) => (
												<option key={val} value={val}>{val}</option>
											))
										}
									</Input>

								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__input-desc" sm={2}>描述</Label>
								<Col sm={10}>
									<Input type="textarea" id="PostForm__input-desc" defaultValue={quot} innerRef={node => {this.desc = node}} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__input-freeTime" sm={2}>時間地點</Label>
								<Col sm={10}>
									<Input type="text" id="PostForm__input-freeTime" placeholder="下周三晚上7點後 下周四晚上6點後 下周五整天 六日都可以 地點就男宿交誼聽吧?" innerRef={node => {this.freeTime = node}} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2}>偷來與否</Label>
								<Col sm={10}>
									<Label check>
										<Input className="PostForm__input-steal" type="checkbox" />{' '}是
									</Label>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__file" sm={2}>圖片</Label>
								<Col sm={10}>
									<Input type="file" id="PostForm__file" />
									<FormText color="muted">
										.jpg/.png
									</FormText>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__input-pass" sm={2}>刪文密碼</Label>
								<Col sm={10}>
									<Input type="text" id="PostForm__input-pass" innerRef={node => {this.pass = node}} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col sm={12}>
									<Button disabled={this.state.waiting ? true : false} className="PostForm__btn-submit" block color="primary" onClick={this.handleSubmit}>送出</Button>
								</Col>
							</FormGroup>
						</Form>
					</div>
				</Col>
			</Row>
		)
	}
}
