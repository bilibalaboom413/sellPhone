import axios from 'axios';

import { Form, Input, InputNumber, Button, message } from 'antd';
import React, { Component } from 'react'

import { useNavigate, Link} from 'react-router-dom'


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
    title:"",
    brand:"",
    image:"",
    stock:"",
    price:"",
    seller:"5f5237a4c1beb1523fa3da02"
   }

  constructor(){
    super();
   // this.setUserInfo = this.setUserInfo.bind(this);
  }


  
   

   //ManageList    //AddList

  setUserInfo = async() =>{
    
    const phone = [{
      title:this.state.title,
      brand:this.state.brand,
      image:this.state.image,
      stock:this.state.stock,
      price:this.state.price,
      seller:this.state.seller
      
    }]

    axios.post('http://localhost:8000/user/addList',{
      phone
    })
    .then(res => {
     // alert('Sucess add your phone item')
      message.success('Sucess add your phone item')
    }
    )
  }


 
 
  onChangeTitle(e) {

   this.setState({
    title: e.target.value 
 })
}

  onChangeBrand(e) {

  this.setState({
   brand: e.target.value 
})
}

  onChangeImage(e) {

  this.setState({
   image: e.target.value 
})
}

  onChangeStock(e) {

  this.setState({
   stock: e.target.value 
})
}

  onChangePrice(e) {

  this.setState({
   price: e.target.value 
})
}

 

 






  render() {
    return (
     
     
     <Form {...layout} name="nest-messages">
      <Form.Item
        name={['user', 'title']}
        label="title"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder={"Please input your title"} onChange={this.onChangeTitle.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'brand']}
        label="brand"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder={"Please input your brand of phone"} onChange={this.onChangeBrand.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'image']}
        label="image"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder={"Please input your image url"} onChange={this.onChangeImage.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'stock']}
        label="stock"
        rules={[
          {
            required: false,
            type:'integer',
          },
        ]}
      >
        <Input placeholder={"Please input amount of your phone"} onChange={this.onChangeStock.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'price']}
        label="price"
        rules={[
          {
            required: false,
            type:'float',
          },
        ]}
      >
        <Input placeholder={"Please input your price"} onChange={this.onChangePrice.bind(this)}/>
      </Form.Item>

      
     

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button onClick={this.setUserInfo.bind(this)}>
          Submit
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
  <Link to="/userHome/manageList">
  <Button onClick={this.setUserInfo.bind(this)}>
          Go back to list managing
        </Button>
  </Link>
  </Form.Item>
    </Form>

        
    )
  }


}


