import React, { Component } from "react";

import axios from "axios";

import { Form, Input, Button, message, Layout } from "antd";

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
    _id: "5f5237a4c1beb1523fa3da02",
    newpassword: "",
    password: "",
  };

  constructor() {
    super();
    this.getUserInfo();
  }

  checkPassword() {
    const str = prompt("Please input your password");
    if (str == this.state.password) {
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

  onChangeP(e) {
    this.setState({
      newpassword: e.target.value,
    });
  }

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
            <Button onClick={() => this.checkPassword()}>Register</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
