import axios from "axios";

import { Form, Input } from "antd";
import React, { Component } from "react";
import md5 from "../Sign/md5";

/* Setting the layout of page */
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

export default class EditProfile extends Component {
  state = {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    change: 0,
  };

  constructor() {
    super();
    this.CheckLogin();
  }

  /* Check whether user login, if no login, alert user and back to home page */
  CheckLogin = async () => {
    axios
      .get("http://localhost:8000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.data !== "No Login!") {
          console.log(res.data);
          console.log("id res " + res.data._id);
          this.setState({ _id: res.data._id }, () => {
            this.getUserInfo();
          });

          console.log("the id " + this.state._id);
        } else {
          console.log("No Login!");
          alert("Please login first!! Click Back to home button to back ");
        }
      })
      .catch((err) => console.log(err.data));
  };

  /*   Acording to the userId, send request to get userdetail information */
  getUserInfo = async () => {
    const id = this.state._id;
    console.log("send id:" + id);
    axios
      .get("http://localhost:8000/user/userPage", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        this.setState({ _id: res.data[0]._id });
        this.setState({ firstname: res.data[0].firstname });
        this.setState({ lastname: res.data[0].lastname });
        this.setState({ email: res.data[0].email });
        this.setState({ password: res.data[0].password });
      });
  };

  /*   Update the userinformatin according to user input */
  setUserInfo = async () => {
    const user = [
      {
        _id: this.state._id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
      },
    ];

    console.log("here is test user: " + user.firstname);
    axios
      .post("http://localhost:8000/user/updateUserPage", {
        user,
      })
      .then(() => {
        //alert('Sucess update your file')
      });
  };

  /*   Check whether user have password, and check whether input some value, if no value, return alert */
  checkPassword() {
    if (this.state.change === 0) {
      alert("You input nothing, Please input some value,");
    } else {
      const str = prompt("Please input your password");
      if (md5(str) === this.state.password) {
        this.setUserInfo();
        alert("Sucess update your file");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        alert("You input wrong password, try again!");
      }
    }
  }

  /*  Update the change of firstname */
  onChangeF(e) {
    this.setState({
      firstname: e.target.value,
      change: 1,
    });
  }

  /*  Update the change of lastname */
  onChangeL(e) {
    this.setState({
      lastname: e.target.value,
      change: 1,
    });
  }

  /*  Update the change of email */
  onChangeE(e) {
    this.setState({
      email: e.target.value,
      change: 1,
    });
  }

  render() {
    return (
      <Form {...layout} name="nest-messages">
        <Form.Item
          name={["user", "firstname"]}
          label="First Name"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={this.state.firstname}
            onChange={this.onChangeF.bind(this)}
          />
        </Form.Item>

        <Form.Item
          name={["user", "lastname"]}
          label="Last Name"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input
            placeholder={this.state.lastname}
            onChange={this.onChangeL.bind(this)}
          />
        </Form.Item>

        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input
            placeholder={this.state.email}
            onChange={this.onChangeE.bind(this)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <button onClick={() => this.checkPassword()}>Submit</button>
        </Form.Item>
      </Form>
    );
  }
}
