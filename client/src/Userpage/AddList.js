import axios from "axios";

import { Form, Input, InputNumber, Button, message } from "antd";
import React, { Component } from "react";

import { useNavigate, Link } from "react-router-dom";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 10,
	},
};
/* eslint-disable no-template-curly-in-string */

export default class ManageList extends Component {
	state = {
		title: "",
		brand: "",
		image: "",
		stock: "",
		price: "",
		seller: "",
	};

	constructor() {
		super();
		this.CheckLogin();
	}

	/* get user id from login session */
	CheckLogin = async () => {
		// Change Button content depends on user login situation
		// If user has login, to show the UserID
		axios
			.get("/authenticate", { withCredentials: true })
			.then((res) => {
				if (res.data !== "No Login!") {
					this.setState({ seller: res.data._id }, () => {
						this.setUserInfo();
					});
				} else {
					alert("Please login first!!");
				}
			})
			.catch((err) => console.log(err.data));
	};

	/*  add new phone to database */
	setUserInfo = async () => {
		const phone = [
			{
				title: this.state.title,
				brand: this.state.brand,
				image: this.state.image,
				stock: this.state.stock,
				price: this.state.price,
				seller: this.state.seller,
			},
		];

		axios
			.post("/user/addList", {
				phone,
			})
			.then((res) => {
				// alert('Sucess add your phone item')
				alert("Sucess add your phone item");
			});
	};

	/*   record the title of user input */
	onChangeTitle(e) {
		this.setState({
			title: e.target.value,
		});
	}

	/*   record the brand of user input */
	onChangeBrand(e) {
		this.setState({
			brand: e.target.value,
		});
	}

	/*   record the Image of user input */
	onChangeImage(e) {
		this.setState({
			image: e.target.value,
		});
	}

	/*   record the stock of user input */
	onChangeStock(e) {
		this.setState({
			stock: e.target.value,
		});
	}

	/*   record the price of user input */
	onChangePrice(e) {
		this.setState({
			price: e.target.value,
		});
	}

	render() {
		return (
			<Form {...layout} name="nest-messages">
				<Form.Item
					name={["user", "title"]}
					label="title"
					rules={[
						{
							required: true,
							message: "Title can not be empty",
						},
					]}
				>
					<Input
						placeholder={"Please input your title"}
						onChange={this.onChangeTitle.bind(this)}
					/>
				</Form.Item>

				<Form.Item
					name={["user", "brand"]}
					label="brand"
					rules={[
						{
							required: true,
							message: "Brand can not be empty",
						},
					]}
				>
					<Input
						placeholder={"Please input your brand of phone"}
						onChange={this.onChangeBrand.bind(this)}
					/>
				</Form.Item>

				<Form.Item
					name={["user", "image"]}
					label="image"
					rules={[
						{
							required: true,
							message: "Image can not be empty",
						},
					]}
				>
					<Input
						placeholder={"Please input your image url"}
						onChange={this.onChangeImage.bind(this)}
					/>
				</Form.Item>

				<Form.Item
					name={["user", "stock"]}
					label="stock"
					rules={[
						{
							required: true,
							message: "Stock can not be empty",
						},
						{
							pattern: /^[0-9]+$/,
							message: "Input not a valid integer number!",
						},
					]}
				>
					<Input
						placeholder={"Please input amount of your phone"}
						onChange={this.onChangeStock.bind(this)}
					/>
				</Form.Item>

				<Form.Item
					name={["user", "price"]}
					label="price"
					rules={[
						{
							required: true,
							message: "Price can not be empty",
						},
						{
							pattern: /([1-9]\d*\.?\d*)|(0\.\d*[1-9])/,
							message: "Input not a valid float number!",
						},
					]}
				>
					<Input
						placeholder={"Please input your price"}
						onChange={this.onChangePrice.bind(this)}
					/>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<button onClick={this.setUserInfo.bind(this)}>
						Submit
					</button>
				</Form.Item>

				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Link to="/userHome/manageList">
						<button>Go back to list managing</button>
					</Link>
				</Form.Item>
			</Form>
		);
	}
}
