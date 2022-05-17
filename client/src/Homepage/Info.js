import React from "react";
import axios from "axios";
import "./homepage.css";
class Info extends React.Component {
  state = {
    phones: [],
    reviews: [],
    showreviews: [],
    quantity: 0,
    prevPhone: {
      id: "",
      quantity: 0,
    },
    inputQuantity: false,
    commentInput: "",
    ratingInput: 5,
    username: "",
    visible: false,
    reviewNumber: 3,
  };

  constructor(props) {
    super(props);
    this.state.phoneid = props.phoneid;
    this.state.userid = props.userid;
    this.getInfo();
    this.getreview();
  }

  // Add the cart information in localStorage
  componentDidUpdate() {
    if (!isNaN(this.state.quantity) && this.state.quantity > 0) {
      const id = this.state.phones[0]._id;
      const title = this.state.phones[0].title;
      const price = this.state.phones[0].price;
      const phone = {
        id: id,
        title: title,
        price: price,
        addedQuantity: this.state.quantity,
      };
      let numOfCategory = localStorage.getItem("numOfCategory");
      if (localStorage.getItem("numOfCategory")) {
        if (this.state.prevPhone.id !== this.state.phones[0]._id) {
          localStorage.setItem("numOfCategory", parseInt(numOfCategory) + 1);
          this.setState({
            prevPhone: {
              id: phone.id,
              quantity: phone.addedQuantity,
            },
          });
        }
        numOfCategory = localStorage.getItem("numOfCategory");
        localStorage.setItem(numOfCategory, JSON.stringify(phone));
      } else {
        localStorage.setItem("numOfCategory", 1);
        localStorage.setItem(1, JSON.stringify(phone));
        this.setState({
          prevPhone: {
            id: phone.id,
            quantity: phone.addedQuantity,
          },
        });
      }
    }
  }

  //Load the phone information
  getInfo = async () => {
    const { phoneid } = this.state;
    axios
      .get("http://localhost:8000/phoneinfo", {
        params: {
          id: phoneid,
        },
      })
      .then((_d) => {
        this.setState({ phones: _d.data });
      });
  };

  //Using ID and review number to load the phone review
  getreview = async () => {
    const { phoneid, reviewNumber } = this.state;
    axios
      .get("http://localhost:8000/getreview", {
        params: {
          id: phoneid,
          reviewNumber: reviewNumber,
        },
      })
      .then((_d) => {
        this.getShowReview(_d.data);
      });
  };

  //Just show 200 characters of each review
  getShowReview = async (data) => {
    // const { reviews, showreviews } = this.state;
    var reviewlist = [];
    for (const i in data) {
      reviewlist[i] = data[i].reviews.comment;
      if (data[i].reviews.comment.length > 200) {
        data[i].reviews.comment =
          data[i].reviews.comment.substring(0, 200) + "...";
      }
    }
    this.setState({ reviews: data });
    this.setState({ showreviews: reviewlist });
  };

  //to show the entire review if click
  checkLength = async (index) => {
    const { reviews, showreviews } = this.state;
    reviews[index].reviews.comment = showreviews[index];
    this.setState({ reviews });
  };

  //Get more 3 reviews
  getmorereview = async () => {
    let { reviewNumber } = this.state;
    this.state.reviewNumber = reviewNumber + 3;
    this.getreview();
  };
  getallreview = async () => {
    const { phoneid } = this.state;
    axios
      .get("http://localhost:8000/allreview", {
        params: {
          id: phoneid,
        },
      })
      .then((_d) => {
        this.getShowReview(_d.data);
      });
  };
  //add review to current phone
  addReview = async () => {
    if (this.state.commentInput === "") {
      this.state.commentInput = "Default feedback";
    }
    // else {
    //   console.log("321");
    // }
    const { phoneid, userid, commentInput, ratingInput } = this.state;
    axios
      .get("http://localhost:8000/addreview", {
        params: {
          id: phoneid,
          userId: userid,
          rating: ratingInput,
          comment: commentInput,
        },
      })
      .then((_d) => {
        this.getallreview();
        this.state.commentInput = "";
      });
  };

  //The click function for adding review
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
    const stock = this.state.phones[0].stock;
    const tmp = e.target.value;
    if (!isNaN(tmp) && tmp > 0) {
      stock >= tmp
        ? this.setState({ quantity: parseInt(tmp) })
        : alert("Sorry not enough stock for this phone!");
    } else if (!tmp) {
      this.setState({ inputQuantity: false });
    } else {
      alert("Please input a valid quantity!");
    }
    this.setState({ inputQuantity: false });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="infotable">
            <button onClick={this.props.closePopup}>close me</button>
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
                    <td>
                      <img
                        className="listimg"
                        src={process.env.PUBLIC_URL + phone.image}
                      />
                    </td>
                    <td>{phone.stock}</td>
                    <td>{phone.seller}</td>
                    <td>{phone.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <thead>
                <th>reviewer</th>
                <th>rating</th>
                <th>comment</th>
              </thead>
              <tbody>
                {this.state.reviews.map((review, index) => (
                  <tr>
                    <td>{review.reviews.reviewer}</td>
                    <td>{review.reviews.rating}</td>
                    <td onClick={() => this.checkLength(index)}>
                      {review.reviews.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="infoinput">
            <div className="infoinputleft">
              <label>current added quantity: </label>
              <span className="added-quantity">{this.state.quantity}</span>
              {this.state.inputQuantity && (
                <input
                  type="text"
                  placeholder="input quantity"
                  onBlur={(e) => {
                    this.handleInputQuantity(e);
                  }}
                />
              )}
              {!this.state.inputQuantity && (
                <input
                  onClick={() =>
                    this.state.userid
                      ? this.setState({ inputQuantity: true })
                      : (window.location = "./login")
                  }
                  type="button"
                  value="add to cart"
                />
              )}
            </div>
            <div className="infoinputright">
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
              <input
                onClick={() =>
                  this.state.userid
                    ? this.addReview()
                    : (window.location = "./login")
                }
                type="button"
                value="add review"
              />
              <button onClick={this.getmorereview}>More review</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
