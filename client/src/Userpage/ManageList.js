import axios from "axios";

import { Table, message } from "antd";
import React, { Component } from "react";

import { Link, Outlet } from "react-router-dom";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};
/* eslint-disable no-template-curly-in-string */

export default class ManageList extends Component {
  state = {
    seller: "5f5237a4c1beb1523fa3da02",
    phoneList: [],
    reviewer: "",
    clone: [],
  };

  constructor() {
    super();
    this.CheckLogin();
  }

  /* get user id from login session */
  CheckLogin = async () => {
    // Change Button content depends on user login situation
    // If user has login, to show the UserID
    axios
      .get("http://localhost:8000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.data !== "No Login!") {
          this.setState({ seller: res.data._id }, () => {
            this.setPhoneInfo();
          });
        } else {
          alert("Please login first!! Click Back to home button to back");
        }
      })
      .catch((err) => console.log(err.data));
  };

  /* get phone list of user, according to user id */
  setPhoneInfo = async () => {
    const phone = [
      {
        seller: this.state.seller,
      },
    ];
    axios.post("http://localhost:8000/user/userPhone", phone).then((res) => {
      /*   console.log('res_data '+res.data) */
      this.setState({ phoneList: res.data });
      console.log(res.data);
      console.log(this.state.phoneList);
      console.log(this.state.phoneList[0]);
      console.log(this.state.phoneList[1]);
    });
  };

  /* get which delete item user select */
  getSelect = (val) => {
    const phone = [
      {
        _id: val._id,
      },
    ];
    axios.post("http://localhost:8000/user/deletePhone", phone).then((res) => {
      message.success("Succes delete this phone item!");
      setTimeout(() => window.location.reload(), 1500);
    });
  };

  /* get which enable item user select */
  enable = (val) => {
    const phone = [
      {
        _id: val._id,
      },
    ];
    axios.post("http://localhost:8000/user/enable", phone).then((res) => {
      message("Succes display the item");
    });
  };

  /* get which disableitem user select */
  disable = (val) => {
    const phone = [
      {
        _id: val._id,
      },
    ];
    axios.post("http://localhost:8000/user/disable", phone).then((res) => {
      message("Succes display the item");
    });
  };

  render() {
    const { Column, ColumnGroup } = Table;
    const data = this.state.phoneList;

    const columns = [
      {
        title: "title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "image",
        dataIndex: "image",
        key: "image",
      },
      {
        title: "stock",
        dataIndex: "stock",
        key: "stock",
      },
      /* {
    title: 'seller',
    dataIndex: 'seller',
    key: 'seller',
  }, */
      {
        title: "price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Management",
        key: "operation",
        render: (record) => (
          <>
            <button onClick={() => this.enable(record)}>Enable</button>
            <button onClick={() => this.disable(record)}>Disable</button>
            <button onClick={() => this.getSelect(record)}>Delete</button>
          </>
        ),
      },
    ];

    const expandedRowRender = (record) => {
      if (record != null) {
        const columns = [
          {
            title: "reviewer",
            key: "reviewer",
            align: "center",
            width: 100,
            ellipsis: true,
            render: (data = record[0]) => <div>{data.reviewer}</div>,
          },
          {
            title: "rating",
            key: "rating",
            align: "center",
            width: 100,
            ellipsis: true,
            render: (data = record[0]) => <div>{data.rating}</div>,
          },
          {
            title: "comment",
            key: "comment",
            align: "center",
            width: 100,
            ellipsis: true,
            render: (data = record[0]) => <div>{data.comment}</div>,
          },
        ];
        return (
          <Table
            columns={columns}
            dataSource={record}
            pagination={false}
            rowKey={(record) => record.reviewer}
          />
        );
      } else {
        return null;
      }
    };

    return (
      <>
        <Table
          dataSource={data}
          columns={columns}
          rowKey={(record) => record._id}
          expandedRowRender={(record) => expandedRowRender(record.reviews)}
        >
          <Column title="title" dataIndex="title" key="title" />
          <Column title="brand" dataIndex="brand" key="brand" />
          <Column title="image" dataIndex="image" key="image" />
          <Column title="stock" dataIndex="stock" key="stock" />
          <Column title="seller" dataIndex="seller" key="seller" />
          <Column title="price" dataIndex="price" key="price" />
          <Column title="reviews" dataIndex="reviews" key="reviews" />
        </Table>
        <Link to="/userHome/addList">
          <button>Add a new Phone list</button>
        </Link>
      </>
    );
  }
}
