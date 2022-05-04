import React from "react";
import axios from "axios";

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
  };

  constructor() {
    super();
    this.getBrand();
    this.getData();
    this.getHighestValue();
  }

  getData = async () => {
    axios.get("http://localhost:8000/phone").then((_d) => {
      // console.log(_d)
      this.setState({ phones: _d.data });
    });
  };
  getBrand = async () => {
    axios.get("http://localhost:8000/brand").then((_d) => {
      // console.log(_d.data)
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
        console.log(_d);
        this.setState({ phones: _d.data });
      });
  };
  getHighestValue = async () => {
    axios.get("http://localhost:8000/highestValue").then((_d) => {
      this.setState({ highValue: _d.data });
      console.log(_d.data);
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
            <select
              value={this.state.BrandInput}
              onChange={this.handleGetBrand}
            >
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
            {/* <a>{this.state.setValue}</a> */}
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
                <th>title</th>
                <th>brand</th>
                <th>image</th>
                <th>stock</th>
                <th>seller</th>
                <th>price</th>
                <th></th>
              </thead>
              <tbody>
                {this.state.phones.map((phone) => (
                  <tr key={phone._id}>
                    <td>{phone.title}</td>
                    <td>{phone.brand}</td>
                    <td>{phone._id}</td>
                    <td>{phone.stock}</td>
                    <td>{phone.seller}</td>
                    <td>{phone.price}</td>
                    <td>
                      <button
                        onClick={() =>
                          //   window.open(
                          //     "/addreview?bookId=" +
                          //       phone._id +
                          //       "&userId=" +
                          //       this.state.userId
                          //   )
                          (window.location = `/addreview?bookId=${phone._id}&userId=${this.state.userId}`)
                        }
                      >
                        EditBook
                      </button>
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
