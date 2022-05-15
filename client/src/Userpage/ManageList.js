import axios from 'axios';

import { Form, Input, InputNumber, Button, Table, Tag, Space, message } from 'antd';
import React, { Component } from 'react'

import { Link, Outlet} from 'react-router-dom'


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
    seller:"5f5237a4c1beb1523fa3da02",
    phoneList:[],
    reviewer:"",
    clone:[]
   }

  constructor(){
    super();
    this.setPhoneInfo();
    
   // this.setReviewer();
   
  }


  
   




  setPhoneInfo = async () =>{
    const phone = [{
      
      seller:this.state.seller
      
    }]
    axios.post('http://localhost:8000/user/userPhone', phone)
        .then( res =>{
          /*   console.log('res_data '+res.data) */
            this.setState({phoneList: res.data})
            console.log(res.data)
            console.log(this.state.phoneList)
            console.log(this.state.phoneList[0])
            console.log(this.state.phoneList[1])

      
           

        })
}


  getSelect = (val) =>{
    const phone = [{
      
      _id:val._id
      
    }]
    axios.post('http://localhost:8000/user/deletePhone', phone)
        .then( res =>{

          message.success('Succes delete this phone item!')
          setTimeout(()=>window.location.reload(),1500)

        })
  }

  enable = (val) =>{
    const phone = [{
      
      _id:val._id
      
    }]
    axios.post('http://localhost:8000/user/enable', phone)
        .then( res =>{

          message.success('Succes display the item')
         

        })
  }

  disable = (val) =>{
    const phone = [{
      
      _id:val._id
      
    }]
    axios.post('http://localhost:8000/user/disable', phone)
        .then( res =>{

          message.success('Succes display the item')
         

        })
  }

  
  render() {
    const { Column, ColumnGroup } = Table;
    const data = this.state.phoneList;
   
    const columns = [ {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'stock',
    dataIndex: 'stock',
    key: 'stock',
  },
  /* {
    title: 'seller',
    dataIndex: 'seller',
    key: 'seller',
  }, */
  {
    title: 'price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title:'Management',
    key:'operation',
    render: (record) => <><Button onClick={()=> this.enable(record)}>Enable</Button>
    <Button onClick={()=> this.disable(record)}>Disable</Button>
    <Button onClick={()=> this.getSelect(record)}>Delete</Button></>
  }

];

const expandedRowRender = (record) => {

  if(record!=null){

 
  const columns = [
      { title: 'reviewer', key: 'reviewer', align: "center", width: 100, ellipsis: true,
      render:
      (data = record[0]) => <span>{data.reviewer}</span>},
      { title: 'rating', key: 'rating', align: "center", width: 100, ellipsis: true,
      render:
      (data = record[0]) => <span>{data.rating}</span>},
      { title: 'comment', key: 'comment', align: "center", width: 100, ellipsis: true,
      render:
      (data = record[0]) => <span>{data.comment}</span>},
  ];
  return <Table columns={columns} dataSource={record} pagination={false} rowKey={record => record.reviewer} />;
  }else{
    return null
  }
};



    return (
      
      <>
 
    <Table dataSource={data} columns={columns} rowKey={record => record._id} expandedRowRender={record => expandedRowRender(record.reviews)}>
    
      <Column title="title" dataIndex="title" key="title" />
      <Column title="brand" dataIndex="brand" key="brand" />
      <Column title="image" dataIndex="image" key="image" />
      <Column title="stock" dataIndex="stock" key="stock" />
      <Column title="seller" dataIndex="seller" key="seller" />
      <Column title="price" dataIndex="price" key="price" />
      <Column title="reviews" dataIndex="reviews" key="reviews" />

      
      

  </Table>
  <Link to="/userHome/addList">
        
  <Button>Add a new Phone list</Button>

  </Link>
   
      </>
    )
  }


}


