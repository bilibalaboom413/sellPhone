import React from "react";
import axios from "axios";
// import Checkout from "../checkout/Checkout";
import Route from "react-router-dom";

class Search extends React.Component {
  state = {
    phones: [],
    phonesCheckout: [
        {
            id: "625d127d2140a08eb1365d2a",
            title:
              '"CLEAR CLEAN ESN" Sprint EPIC 4G Galaxy SPH-D700*FRONT CAMERA*ANDROID*SLIDER*QWERTY KEYBOARD*TOUCH SCREEN',
            price: 1.99,
            addedQuantity: 1,
          },
          {
            id: "625d127d2140a08eb1365d2b",
            title: "Cricket Samsung Galaxy Discover R740 Phone",
            price: 2,
            addedQuantity: 1,
          },
          {
            id: "625d127d2140a08eb1365d2c",
            title: "Galaxy s III mini SM-G730V Verizon Cell Phone BLUE",
            price: 3,
            addedQuantity: 1,
          },
          {
            id: "625d127d2140a08eb1365d2d",
            title: "Galaxy S5 G900A Factory Unlocked Android Smartphone 16GB White",
            price: 1,
            addedQuantity: 1,
          },
    ],
    checkout: false,
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
    this.changeCheckout = this.changeCheckout.bind(this);
  }

  changeCheckout(data) {
      this.setState({ 
          checkout: data
      })
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

  handleCheckout() {
      window.location = "./checkout";
    //   browserHistory.push({pathname: "/checkout", state: this.state.phonesCheckout})
    //   console.log(browserHistory);
  }

  render() {
    return (
      <div id="root">
        {/* {
            this.state.checkout ?
            <Checkout checkout={this.changeCheckout} phonesCheckout={this.state.phonesCheckout}/> :  */}
            <div>     
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
                <a>{this.state.setValue}</a>
                <input type="button" onClick={this.getSearch} value="search" />
                </div>

                <div>
                {/* <button onClick={() => this.setState({checkout: true})}>checkout</button> */}
                <button onClick={this.handleCheckout}>checkout</button>
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
                                window.open(
                                "/addreview?bookId=" +
                                    phone._id +
                                    "&userId=" +
                                    this.state.userId
                                )
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
        {/* } */}
      </div>
    );
  }
}

export default Search;
