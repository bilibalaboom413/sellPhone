import axios from 'axios';

import { Form, Input, Button, message } from 'antd';
import React, { Component } from 'react'


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
    _id:"",
    firstname:"",
    lastname:"",
    email:""
   }

  constructor(){
    super();
    this.getUserInfo();
   // this.setUserInfo = this.setUserInfo.bind(this);
  }


  onFinish = (values) => {
    console.log(values);
  };
   

  getUserInfo = async() =>{
    console.log('post request')
    axios.get('http://localhost:8000/userPage')
    .then(res =>{
  //    this.setState({userInfo:res.data})
      console.log(res)
      console.log(res.id)
      console.log(res.data)
      this.setState({_id:res.data[0]._id})
      console.log('id '+this.state._id)
      this.setState({firstname:res.data[0].firstname})
      this.setState({lastname:res.data[0].lastname})
      this.setState({email:res.data[0].email})
      console.log(this.state.firstname)
    /*   console.log('this is backup:'+this.backdata[0].firstname) */
    })
  }

  setUserInfo = async() =>{
    
    const user = [{
      _id:this.state._id,
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email
    }]

    console.log('here is test user: '+user.firstname)
    axios.post('http://localhost:8000/updateUserPage',{
      user
    })
    .then(
      () =>{
      //alert('Sucess update your file')
      message.success('Sucess update your file')
      }
    )
  }



 
  onChangeF(e) {

   this.setState({
    firstname: e.target.value 
 })
   
}

  onChangeL(e) {
  this.setState({
      lastname: e.target.value 
  })
  /* this.backdata.lastname = e.target.value */
}

  onChangeE(e) {
  this.setState({
      email: e.target.value 
  })
 /*  this.backdata.email = e.target.value */
}

 






  render() {
    return (
     
     
     <Form {...layout} name="nest-messages">
      <Form.Item
        name={['user', 'firstname']}
        label="firstName"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder={this.state.firstname} onChange={this.onChangeF.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'lastname']}
        label="lastName"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input placeholder={this.state.lastname} onChange={this.onChangeL.bind(this)}/>
      </Form.Item>

      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input placeholder={this.state.email} onChange={this.onChangeE.bind(this)}/>
      </Form.Item>
     

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button onClick={this.setUserInfo.bind(this)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    )
  }


}


