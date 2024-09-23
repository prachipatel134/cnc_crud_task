import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
       const getUserData = JSON.parse(localStorage.getItem('user'))
    //    console.log("getuserdata",getUserData);
   
    const findUser = getUserData.find((user)=> user.user.email=== values.user.email && user.user.password === values.user.password)
    
        if(findUser){
        message.success('Login Sucessfully!')
        navigate('/users');
       }
       else{
        message.error('Email or password is Invalid!')
       }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vh] py-[30vh] 
    '>
        <div className='w-[30%] m-auto my-auto bg-white rounded-[20px] px-[20px] pt-[20px]'>
      <h2 className=' font-bold text-2xl pb-[40px] text-blue-600'>EMS</h2>
      <h3 className='font-bold text-base'>SIGN IN</h3>
      <p className="pb-[30px] text-gray-800"> Enter Your Credentials to access your account</p>
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

    

    <Form.Item className='mb-2'
     
    >
      <Button type="primary" htmlType="submit" block>
        SIGN IN
      </Button>
    </Form.Item>
  </Form>
  <p className='text-gray-800 pb-[20px]'>Forgot your password? <a href="#"><span className=' underline text-blue-600'>Reset Password</span></a></p>
  </div>
    </div>
  )
}
