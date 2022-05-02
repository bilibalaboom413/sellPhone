import React from "react";
import axios from "axios";

class Info extends React.Component {
  state = {
    phones: [],
    quantity: 0,
    inputQuantity: false,
    commentInput: "",
    ratingInput: 5,
    userid: "",
    username: "",
  };

  constructor() {
    super();
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");
      if (pair[0] === "bookId") {
        this.state.bookid = pair[1];
      }
      if (pair[0] === "userId") {
        this.state.userid = pair[1];
      }
    }
    this.getInfo();
  }

  getInfo = async () => {
    const { bookid } = this.state;
    axios
      .get("http://localhost:8000/phoneinfo", {
        params: {
          id: bookid,
        },
      })
      .then((_d) => {
        this.setState({ phones: _d.data });
        // console.log(_d.data)
      });
  };
  addReview = async () => {
    const { bookid, userid, commentInput, ratingInput } = this.state;
    axios
      .get("http://localhost:8000/addreview", {
        params: {
          id: bookid,
          userId: userid,
          rating: ratingInput,
          comment: commentInput,
        },
      })
      .then((_d) => {
        this.getInfo();
      });
  };
  FinduserName = async (userid) => {
    // const {userid} = this.state;
    axios
      .get("http://localhost:8000/finduser", {
        params: {
          id: userid,
        },
      })
      .then((_d) => {
        this.setState({ username: _d.data });
      });
  };
  handleGetComment = (event) => {
    this.setState({
      commentInput: event.target.value,
    });
  };
  handleGetRating = (event) => {
    this.setState({
      ratingInput: event.target.value,
    });
  };

  handleInputQuantity = (e) => {
    const tmp = e.target.value;
    if (!isNaN(tmp) && tmp > 0) {
      this.setState({ quantity: parseInt(tmp) });
    } else if (!tmp) {
      this.setState({ inputQuantity: false });
    } else {
      alert("Please input a valid quantity!");
    }
    this.setState({ inputQuantity: false });
  };

  render() {
    return (
      <div id="root">
        <table>
          <thead>
            <th>title</th>
            <th>brand</th>
            <th>image</th>
            <th>stock</th>
            <th>seller</th>
            <th>price</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <th>reviews</th>
          </thead>
          <tbody>
            {this.state.phones.map((phone) => (
              <tr key={phone._id}>
                {phone.reviews.map((review) => (
                  <tr>
                    <td>{review.reviewer}</td>

                    <td>{review.rating}</td>

                    <td>{review.comment}</td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <label>current added quantity: </label>
          <span className="added-quantity">{this.state.quantity}</span>
          {this.state.inputQuantity && (
            <input
              type="text"
              placeholder="input quantity"
              onBlur={(e) => {
                this.handleInputQuantity(e);
                // if (!isNaN(this.state.quantity) && this.state.quantity > 0) {
                //     const id = this.state.phones[0]._id;
                //     const title = this.state.phones[0].title;
                //     const price = this.state.phones[0].price;
                //     const phone = {
                //         id: id,
                //         title: title,
                //         price: price,
                //         addQuantity: this.state.quantity
                //     }
                //     if (window.localStorage.getItem(id)) {
                //         window.localStorage.removeItem(id)
                //     }
                //     window.localStorage.setItem(id, JSON.stringify(phone));
                //     console.log(window.localStorage);
                // }
              }}
            />
          )}
          {!this.state.inputQuantity && (
            <input
              onClick={() => this.setState({ inputQuantity: true })}
              type="button"
              value="add to cart"
            />
          )}
          <input
            type="text"
            placeholder="Comment"
            value={this.state.commentInput}
            onChange={this.handleGetComment}
          />
          <select
            value={this.state.ratingInput}
            onChange={this.handleGetRating}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <input type="button" onClick={this.addReview} value="add review" />
        </div>
      </div>
    );
  }
}

export default Info;
