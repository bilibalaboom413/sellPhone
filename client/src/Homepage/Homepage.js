import React from "react";
import axios from "axios";
import Info from "./Info";
import "./homepage.css";

class Homepage extends React.Component {
	state = {
		phones: [],
		soldout: [],
		bestseller: [],
		brandlist: [],
		searchInput: "",
		BrandInput: "",
		highValue: "",
		setValue: 500,
		phoneid: "",
		showPopup: false,
		userId: "",
		userfullname: "",
		ButtonContent: "Log in",
		hasLogin: false,
		listNumber: 10,
	};

	constructor() {
		super();
		this.getBrand();
		this.getSearch();
		this.getHighestValue();
		this.getSoldout();
		this.getBestseller();
		this.CheckLogin();
	}

	getBrand = async () => {
		axios.get("/brand").then((_d) => {
			this.setState({ brandlist: _d.data });
		});
	};
	getSoldout = async () => {
		axios.get("/Soldout").then((_d) => {
			this.setState({ soldout: _d.data });
		});
	};
	getBestseller = async () => {
		axios.get("/Bestseller").then((_d) => {
			this.setState({ bestseller: _d.data });
		});
	};

	getSearch = async () => {
		const { searchInput, BrandInput, setValue } = this.state;
		let { listNumber } = this.state;
		axios
			.get("/Search", {
				params: {
					title: searchInput,
					brand: BrandInput,
					value: setValue,
					listNumber: listNumber,
				},
			})
			.then((_d) => {
				if (_d.data[0] != null) {
					this.setState({ phones: _d.data });
				} else {
					window.alert(
						"There does not have phones accord with the input requirements. Please change search conditions!"
					);
				}
			});
	};
	getmorephone = async () => {
		let { listNumber } = this.state;
		this.state.listNumber = listNumber + 10;
		this.getSearch();
	};
	getHighestValue = async () => {
		axios.get("/highestValue").then((_d) => {
			this.setState({ highValue: _d.data });
		});
	};
	handleGetTitle = (event) => {
		this.setState({
			searchInput: event.target.value,
		});
	};
	handleGetBrand = (event) => {
		this.setState({
			BrandInput: event.target.value,
		});
	};
	handleGetValue = (event) => {
		this.setState({
			setValue: event.target.value,
		});
	};
	togglePopup(param) {
		this.setState({
			phoneid: param,
			showPopup: !this.state.showPopup,
		});
	}
	CheckLogin = async () => {
		// Change Button content depends on user login situation
		// If user has login, to show the UserID
		axios
			.get("/authenticate", { withCredentials: true })
			.then((res) => {
				if (res.data !== "No Login!") {
					console.log(res.data);
					this.setState(
						{
							userId: res.data._id,
						},
						() => {
							this.getUserInfo();
						}
					);
				} else {
					console.log("No Login!");
					this.setState({ userId: null, ButtonContent: "Sign In" });
				}
			})
			.catch((err) => console.log(err.data));
	};
	getUserInfo = async () => {
		const id = this.state.userId;
		console.log("send id:" + id);
		axios
			.get("/user/userPage", {
				params: {
					id: id,
				},
			})
			.then((res) => {
				this.setState({
					userfullname:
						res.data[0].firstname + " " + res.data[0].lastname,
					ButtonContent: "Sign Out",
				});
			});
	};
	signBtn = async () => {
		if (this.state.ButtonContent === "Sign In") {
			window.location = "./login";
		} else if (this.state.ButtonContent === "Sign Out") {
			if (window.confirm("Are you sure to sign out?")) {
				axios
					.get("/logout", { withCredentials: true })
					.then((res) => {
						if (res.data === "Logout!") {
							window.location = "./login";
						}
					})
					.catch((err) => console.log(err.data));
			}
		}
	};
	render() {
		return (
			<div className="Homepage">
				<div className="navigationbar">
					<div className="Barleft">
						<h1>SellPhone</h1>
					</div>
					<div className="BarMid">
						<input
							className="titlesearchinput"
							type="text"
							placeholder="Search by title"
							value={this.state.searchInput}
							onChange={this.handleGetTitle}
						/>
						<select
							className="brandsearchinput"
							value={this.state.BrandInput}
							onChange={this.handleGetBrand}
						>
							<option value="">Phone Brand</option>
							{this.state.brandlist.map((brandlist) => (
								<option>{brandlist}</option>
							))}
						</select>
						<input
							className="highvaluesearchinput"
							type="range"
							name="Value"
							min="0"
							max={this.state.highValue.price + 1}
							value={this.state.setValue}
							onChange={this.handleGetValue}
						/>
						<div className="valueshow">
							<span>{"$ < " + this.state.setValue}</span>
						</div>
						<input
							type="button"
							className="searchbutton"
							onClick={this.getSearch}
							value="Search"
						/>
					</div>
					<div className="ButtonList">
						{/*<div className="LoginComponent">*/}
						{this.state.userId ? (
							<p className="welcomeslogan">
								Welcome, {this.state.userfullname}
							</p>
						) : null}
						<button onClick={this.signBtn}>
							{this.state.ButtonContent}
						</button>
						{this.state.userId ? (
							<button
								onClick={() =>
									(window.location = "./userHome/editProfile")
								}
							>
								Profile
							</button>
						) : null}
						{/*</div>*/}
						<button
							onClick={() => {
								this.state.userId
									? (window.location = "./checkout")
									: (window.location = "./login");
							}}
						>
							Checkout
						</button>
					</div>
				</div>

				{/*<div className="homepagecontent">*/}
				<div className="soldoutlist">
					<h2>Soldout soon</h2>
					<table>
						<thead>
							<th>Image</th>
							<th>Price</th>
						</thead>
						<tbody>
							{this.state.soldout.map((soldout) => (
								<tr
									key={soldout._id}
									onClick={() =>
										this.togglePopup(soldout._id)
									}
								>
									<td>
										<img
											className="listimg"
											src={
												process.env.PUBLIC_URL +
												soldout.image
											}
										/>
									</td>

									<td>{soldout.price}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="bestsellerlist">
					<h2>Best sellers</h2>
					<table>
						<thead>
							<th>Image</th>
							<th>Rating</th>
						</thead>
						<tbody>
							{this.state.bestseller.map((bestseller) => (
								<tr
									key={bestseller._id}
									onClick={() =>
										this.togglePopup(bestseller._id)
									}
								>
									<td>
										<img
											className="listimg"
											src={
												process.env.PUBLIC_URL +
												bestseller.image
											}
										/>
									</td>
									<td>{bestseller.Ave_rating}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="searchresultlist">
					<table>
						<thead>
							<th>Image</th>
							<th width="50%">Title</th>
							<th width="10%">Brand</th>
							<th width="10%">Price</th>
						</thead>
						<tbody>
							{this.state.phones.map((phone) => (
								<tr
									key={phone._id}
									onClick={() => this.togglePopup(phone._id)}
								>
									<td>
										{" "}
										<img
											className="phoneimg"
											src={
												process.env.PUBLIC_URL +
												phone.image
											}
										/>
									</td>
									<td>{phone.title}</td>
									<td>{phone.brand}</td>
									<td>{phone.price}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="BottomButton">
						<button onClick={this.getmorephone}>More phones</button>
					</div>
					{this.state.showPopup ? (
						<Info
							phoneid={this.state.phoneid}
							userid={this.state.userId}
							closePopup={this.togglePopup.bind(this)}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

export default Homepage;
