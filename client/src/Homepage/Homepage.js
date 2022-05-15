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
    setValue: 200,
    phoneid: "",
    showPopup: false,
    userId: "5f5237a4c1beb1523fa3da05",
    ButtonContent: "Log in",
    hasLogin: false,
  };

  constructor() {
    super();
    this.getBrand();
    this.getData();
    this.getHighestValue();
    this.getSoldout();
    this.getBestseller();
    this.CheckLogin();
  }

  getData = async () => {
    axios.get("http://localhost:8000/phone").then((_d) => {
      this.setState({ phones: _d.data });
    });
  };
  getBrand = async () => {
    axios.get("http://localhost:8000/brand").then((_d) => {
      this.setState({ brandlist: _d.data });
    });
  };
  getSoldout = async () => {
    axios.get("http://localhost:8000/Soldout").then((_d) => {
      this.setState({ soldout: _d.data });
    });
  };
  getBestseller = async () => {
    axios.get("http://localhost:8000/Bestseller").then((_d) => {
      this.setState({ bestseller: _d.data });
    });
  };

  getSearch = async () => {
    const { searchInput, BrandInput, setValue } = this.state;
    axios
      .get("http://localhost:8000/Search", {
        params: {
          title: searchInput,
          brand: BrandInput,
          value: setValue,
        },
      })
      .then((_d) => {
        this.setState({ phones: _d.data });
      });
  };
  getHighestValue = async () => {
    axios.get("http://localhost:8000/highestValue").then((_d) => {
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
      .get("http://localhost:8000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.data !== "No Login!") {
          console.log(res.data);
          this.setState({ userId: res.data._id, ButtonContent: "Sign Out" });
        } else {
          console.log("No Login!");
          this.setState({ userId: null, ButtonContent: "Sign In" });
        }
      })
      .catch((err) => console.log(err.data));
  };
  signBtn = async () => {
    if (this.state.ButtonContent === "Sign In") {
      window.location = "./login";
    } else if (this.state.ButtonContent === "Sign Out") {
      axios
        .get("http://localhost:8000/logout", { withCredentials: true })
        .then((res) => {
          if (res.data === "Logout!") {
            window.location = "./login";
          }
        })
        .catch((err) => console.log(err.data));
    }
  };
  render() {
    return (
      <div className="Homepage">
        <div className="navigationbar">
          <p>Phone Seller</p>
          <div className="LoginComponent">
            <p>{this.state.userId}</p>
            <button onClick={this.signBtn}>{this.state.ButtonContent}</button>
          </div>
          <input
            type="text"
            placeholder="Search by name"
            value={this.state.searchInput}
            onChange={this.handleGetTitle}
          />
          <select value={this.state.BrandInput} onChange={this.handleGetBrand}>
            <option value="">Phone Brand</option>
            {this.state.brandlist.map((brandlist) => (
              <option>{brandlist}</option>
            ))}
          </select>
          <input
            type="range"
            name="Value"
            min="0"
            max={this.state.highValue.price + 1}
            value={this.state.setValue}
            onChange={this.handleGetValue}
          />
          <span>{this.state.setValue}</span>
          <input type="button" onClick={this.getSearch} value="search" />
          <div className="ButtonList">
            <button
              onClick={() => {
                this.state.userId
                  ? (window.location = "./checkout")
                  : (window.location = "./login");
              }}
            >
              checkout
            </button>
          </div>
        </div>

        <div className="homepagecontent">
          <div className="soldoutlist">
            <h1>Soldout List</h1>
            <table>
              <thead>
                <th>title</th>
                <th>price</th>
                <th></th>
              </thead>
              <tbody>
                {this.state.soldout.map((soldout) => (
                  <tr key={soldout._id}>
                    <td onClick={() => this.togglePopup(soldout._id)}>
                      {soldout.title}
                    </td>
                    <td>{soldout.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bestsellerlist">
            <h1>Best Seller List</h1>
            <table>
              <thead>
                <th>title</th>
                <th>rating</th>
                <th></th>
              </thead>
              <tbody>
                {this.state.bestseller.map((bestseller) => (
                  <tr key={bestseller._id}>
                    <td onClick={() => this.togglePopup(bestseller._id)}>
                      {bestseller.title}
                    </td>
                    <td>{bestseller.Ave_rating.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="searchresultlist">
            <table>
              <thead>
                <th>image</th>
                <th>title</th>
                <th>brand</th>
                <th>price</th>
                <th></th>
              </thead>
              <tbody>
                {this.state.phones.map((phone) => (
                  <tr key={phone._id}>
                    <td>{phone.image}</td>
                    <td>{phone.title}</td>
                    <td>{phone.brand}</td>
                    <td>{phone.price}</td>
                    <td>
                      <button onClick={() => this.togglePopup(phone._id)}>
                        Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.state.showPopup ? (
              <Info
                phoneid={this.state.phoneid}
                userid="5f5237a4c1beb1523fa3dbac"
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
