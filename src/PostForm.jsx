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

import './PostForm.css';

export default class PostForm extends React.Component {
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
		return (
			<Row className="pt-4">
				<Col className="PostForm" xs={12}>
					<span className="PostForm__title">共享我的系外套</span>
					<div className="PostForm__FormWrap">
						<Form>
							<FormGroup row>
								<Label for="PostForm__input-name" sm={2}>暱稱</Label>
								<Col sm={10}>
									<Input type="text" id="PostForm__input-name" placeholder="" />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__inpit-dept" sm={2}>外套系所</Label>
								<Col sm={10}>
									<Input type="select" id="PostForm__inpit-dept">
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
									<Input type="textarea" id="PostForm__input-desc" defaultValue={quot} />
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="PostForm__input-freeTime" sm={2}>時間地點</Label>
								<Col sm={10}>
									<Input type="text" id="PostForm__input-freeTime" placeholder="下周三晚上7點後 下周四晚上6點後 下周五整天 六日都可以 地點就男宿交誼聽吧? " />
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
								<Col sm={12}>
									<Button block color="primary">asd</Button>
								</Col>
							</FormGroup>
						</Form>
					</div>
				</Col>
			</Row>
		)
	}
}
