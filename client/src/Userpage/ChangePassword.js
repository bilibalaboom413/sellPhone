import React, { Component } from "react";

import axios from "axios";

import { Form, Input, Button, message, Layout } from "antd";

import md5 from "../Sign/md5";

/* layout of page */
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default class ChangePassword extends Component {
  state = {
    _id: "",
    newpassword: "",
    password: "",
  };

  constructor() {
    super();
    this.CheckLogin();
  }

  /* check whether user have right password, 
  and check whether the new password is equal to old password,
  check whether user input emtyp value */
  checkPassword() {
    if (this.state.newpassword == "") {
      alert("Input empty password, try again!");
    } else if (this.state.newpassword == this.state.password) {
      alert("Your new password equal to old password, try again!");
    } else {
      const str = prompt("Please input your password");
      if (md5(str) == this.state.password) {
        this.setPassword();
        alert("Sucess update your password");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert("You input wrong/empty password, try again!");
      }
    }
  }

  /*  request user old password according to userid */
  getUserInfo = async () => {
    const id = this.state._id;
    axios
      .get("http://localhost:8000/user/userPage", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        this.setState({ _id: res.data[0]._id });
        this.setState({ password: res.data[0].password });
        console.log("Do with id: " + this.state._id);
      });
  };

  /*   get user id through login sessions */
  CheckLogin = async () => {
    // Change Button content depends on user login situation
    // If user has login, to show the UserID
    axios
      .get("http://localhost:8000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.data !== "No Login!") {
          this.setState({ _id: res.data._id }, () => {
            this.getUserInfo();
          });
        } else {
          alert("Please login first!! Click Back to home button to back ");
        }
      })
      .catch((err) => console.log(err.data));
  };

  /*   update user input  */
  onChangeP(e) {
    this.setState({
      newpassword: md5(e.target.value),
    });
  }

  /*   update new password , if the input of user is correct */
  setPassword = async () => {
    const user = [
      {
        _id: this.state._id,
        newpassword: this.state.newpassword,
      },
    ];

    axios
      .post("http://localhost:8000/user/setPassword", {
        user,
      })
      .then(alert("Sucess change your password"));
  };

  render() {
    return (
      <div>
        <Form {...layout} name="register" scrollToFirstError>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password onChange={this.onChangeP.bind(this)} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <button onClick={() => this.checkPassword()}>Register</button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
