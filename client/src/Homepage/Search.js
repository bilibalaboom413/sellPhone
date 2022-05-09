import React from "react";
import axios from "axios";
import Info from "./Info";
import "./Info.css";
class Search extends React.Component {
  state = {
    phones: [],
    soldout: [],
    brandlist: [],
    searchInput: "",
    BrandInput: "",
    highValue: "",
    setValue: 200,
    userId: "5f5237a4c1beb1523fa3da05",
    phoneid: "",
    showPopup: false,
  };

  constructor() {
    super();
    this.getBrand();
    this.getData();
    this.getHighestValue();
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
  render() {
    return (
      <div id="root">
        <div id="search">
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
        </div>

        <div>
          <button onClick={() => (window.location = "./checkout")}>
            checkout
          </button>
        </div>
        <div id="searchList">
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
                    {this.state.showPopup ? (
                      <Info
                        phoneid={this.state.phoneid}
                        userid="5f5237a4c1beb1523fa3dbac"
                        closePopup={this.togglePopup.bind(this)}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Search;
