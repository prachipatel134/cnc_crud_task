import React,{useState} from 'react'
import { Button, Checkbox, Form, Input,Row,Col,DatePicker,Upload, message } from 'antd';
import {
  PlusOutlined
  } from '@ant-design/icons';
  import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
// const [userdata,setUserdata] = useState([]);
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
      const onFinish = (values) => {
        const AlreadyUserData = JSON.parse(localStorage.getItem('user')) || [];

        
        const isEmailRegistered = AlreadyUserData.some(
            (user) => user.user.email === values.user.email
        );
    
        if (isEmailRegistered) {
            message.error("This email is already registered!");
        } else {
            const newUser = values;
    
            
            const updatedUsers = [...AlreadyUserData, newUser];
            localStorage.setItem('user', JSON.stringify(updatedUsers));
    
            message.success("Successfully Registered Email!");
            navigate('/users');
        }
        
     
 
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-full py-[5vh] 
    '>
        <div className='md:w-[35%] m-auto my-auto bg-white rounded-[20px] px-[20px] pt-[20px]'>
      <h2 className='font-bold text-2xl pb-[40px] text-blue-600'>EMS</h2>
      <h3 className='font-bold text-base'>Register</h3>
     
      <Form
    name="login-form"
   
    layout="vertical"
   
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Row gutter={16}>
    <Col span={24}>
   <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
            
        required: true,
        message: 'Please input your Email!',
              
          type: 'email',
        },
      ]}
    >
      <Input placeholder='Enter Your Email' />
    </Form.Item>
    </Col>
    <Col span={24}>
    <Form.Item
      label="Password"
      name={['user','password']}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password placeholder='Enter Your Password' />
    </Form.Item>
    </Col> 
    <Col span={24}>
    <Form.Item
      label="Username"
      name={['user', 'username']}
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    </Col>
    <Col span={12}>
    <Form.Item
       name={['user', 'enroll_number']}
        label="Enroll Number"
        
        rules={[
          {
            required: true,
            message: 'Please input your Enroll Number!',
          },
        ]}
      >
        <Input
         
       
        />
      </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
      name={['user', 'phone']}
        label="Phone Number"
       
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
         
       
        />
      </Form.Item>
      </Col>
      <Col span={24}>
      <Form.Item  name={['user', 'date_addmission']} label="DatePicker">
          <DatePicker className='w-full' placeholder='Date Of Addmission'/>
        </Form.Item>
      </Col>
      <Col span={24}>
      <Form.Item label="Upload Image"  name={['user', 'profile_img']} valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
      </Col>

    <Col span={24}>
    <Form.Item className='mb-2'
     
    >
      <Button type="primary" htmlType="submit" block>
      Register
      </Button>
    </Form.Item>
    </Col>
    </Row>
  </Form>
  <p className='text-gray-800 pb-[20px]'>Already have account? <a href="/login"><span className=' underline text-blue-600'>Sign In</span></a></p>
  </div>

    </div>
  )
}
