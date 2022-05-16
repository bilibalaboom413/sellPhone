import React, { Component } from "react";

import axios from "axios";

import { Form, Input, Button, message, Layout } from "antd";

import md5 from "../Sign/md5";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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

  checkPassword() {
    const str = prompt("Please input your password");
    if (md5(str) == this.state.password) {
      this.setPassword();

      message.success("Sucess update your password");
      setTimeout(() => window.location.reload(), 3000);
    } else {
      alert("You input wrong password, try again!");
    }
  }

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
        this.setState({ newpassword: res.data[0].password });
        this.setState({ password: res.data[0].password });
        console.log("Do with id: " + this.state._id);
        /*   console.log('this is backup:'+this.backdata[0].firstname) */
      });
  };

  CheckLogin = async () => {
    // Change Button content depends on user login situation
    // If user has login, to show the UserID
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
          alert("Please login first!!");
        }
      })
      .catch((err) => console.log(err.data));
  };

  onChangeP(e) {
    this.setState({
      newpassword: e.target.value,
    });
  }

  setPassword = async () => {
    const user = [
      {
        _id: this.state._id,
        newpassword: md5(this.state.newpassword),
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
            <Button onClick={() => this.checkPassword()}>Register</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
