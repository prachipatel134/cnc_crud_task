import React, { createRef, useEffect,useState ,useRef} from 'react';
import { Space, Table, Tag,Layout, Button,Modal, Form, Input,Row,Col,DatePicker,Upload,message } from 'antd';
import{EditOutlined,DeleteOutlined,PlusOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';


const { Header, Content } = Layout;
const {Search} = Input;

export default function UserList() {
   const [userData,SetUserdata] = useState([]);
   const [filteredUser,SetFilteredUser] = useState([]);
   const [searchValue,SetSearchValue] = useState();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const[editingUser,SetEditingUser] = useState();
   const[ formdata,SetFormData] = useState([]);
   const [modalMode, setModalMode] = useState('add');

   const formref= useRef();
   const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
   
   const showModal = () => {
     setIsModalOpen(true);
   };
   const handleOk = () => {
     setIsModalOpen(false);
   };
   const handleCancel = () => {
     setIsModalOpen(false);
     formref.current.resetFields();
   };
   const columns = [
    {
        title: '',
        dataIndex: 'user',
        key: 'user',
        render: (user) =>  <img 
        src={user?.profile_img?.[0].thumbUrl} 
        alt="profile"
        style={{ width: '90px', height: '90px',borderRadius: '10px' }}
      />,
      },
  {
    title: 'Name',
    dataIndex: 'user',
    key: 'user',
    render: (user) => `${user.username}`,
  },
  {
    title: 'Email',
    dataIndex: 'user',
    key: 'user',
    render: (user) => `${user.email}`,
  },
  {
    title: 'Phone',
    dataIndex: 'user',
    key: 'user',
    render: (user) => `${user.phone}`,
  },
  {
    title: 'Enroll Number',
    dataIndex: 'user',
    key: 'user',
    render: (user) => `${user.enroll_number}`,
    
  },
  {
    title: 'Date Of Addmission',
    dataIndex: 'user',
    key: 'user',
    render: (user) => dayjs(`${user.date_addmission}`).format('DD-MM-YYYY'),
    
  },
  
  

  {
    title: 'Action',
    key: 'user',
    render: (user, record) => (
      <Space size="middle">
        <a onClick={()=>EditData(user)}><EditOutlined /></a>
        <a onClick={()=>DeleteData(user)}><DeleteOutlined /></a>
      </Space>
    ),
  },
];
const EditData = (record) => {

  console.log(record);
  if (record === undefined) {
    setIsModalOpen(true);
    setModalMode('add');
    formref?.current?.setFieldsValue();
  } else {
    setIsModalOpen(true);
    SetEditingUser(record);
    setModalMode('edit');


    formref?.current?.setFieldsValue({
      user: {
        email: record.user.email,
        username: record.user.username,
        enroll_number: record.user.enroll_number,
        phone: record.user.phone,
        date_addmission: dayjs(record.user.date_addmission),
      },
    });

   
  
    if (record.user.profile_img && record.user.profile_img.length > 0) {
      const fileList = record.user.profile_img.map((file) => ({
        uid: file.uid,
        name: file.name,
        status: file.status,
        url: file.thumbUrl,
        thumbUrl: file.thumbUrl,
      }));

      formref?.current?.setFieldsValue({
        user:{
        profile_img: fileList,
        } 
      });
    }
  }
};

const DeleteData =(values) =>{
    const AlreadyUserData = JSON.parse(localStorage.getItem('user')) || [];
    const findUser = AlreadyUserData.filter((user)=> user.user.email !== values.user.email )
    localStorage.setItem('user',JSON.stringify(findUser));
  getUserData();
    
}
const onFinish = (values) => {
    const AlreadyUserData = JSON.parse(localStorage.getItem('user')) || [];
    
    if(editingUser){
        console.log(editingUser)
        const updaetadata= AlreadyUserData.map((user) =>user.user.email ===editingUser.user.email ? values:user)
        localStorage.setItem('user',JSON.stringify(updaetadata))
        setIsModalOpen(false);
        getUserData();
    }else{
        const userdata = [...AlreadyUserData,values];
        localStorage.setItem('user',JSON.stringify(userdata));
        message.success("Sucessfully Added data")
        setIsModalOpen(false);
        getUserData();
    }
};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
   const onSearch = (value) => 
    {
        const Sevalue = value.toLowerCase();
        const SearchData = userData.filter((user)=> user.user.email.toLowerCase().includes(Sevalue) );
        SetFilteredUser(SearchData);
    };
    const getUserData =()=>{
        const Data = JSON.parse(localStorage.getItem('user'))
        SetUserdata(Data);
        SetFilteredUser(Data);
    }
    useEffect(()=>{
      getUserData();
       
       },[]);
  return (
    <>
      
      <Layout>
      <Header
      
        style={{
          display: 'flex',
          background: '#fff',
          padding:'20px 30px'
        }}
      >
        <div className="demo-logo" />
        <Search
        className="ms-auto"
      placeholder="input search text"
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
      </Header>
      <Content>
        <div className='flex px-[30px] pt-[30px] justify-between items-center'>
            <h2 className='text-blue-500 font-bold text-2xl'>
                Student List
            </h2>
            <Button type='primary' onClick={()=>EditData()} >Add New Student</Button>
           
        </div>
        <Table className='px-[30px] py-[30px]' columns={columns} dataSource={filteredUser} />
        
        </Content>
        </Layout>

        <Modal title="Student Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
      footer={[
         
        ]}>
        <Form
        ref={formref}
    name="register-form"
    layout="vertical"
  
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   
  >
    <Row gutter={16}>
    <Col span={24}>
  
    </Col>
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
        <Input/>
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
      {modalMode === 'Add' ? "Add Data" : "Edit Data"}
      </Button>
    </Form.Item>
    </Col>

    </Row>
  </Form>
      </Modal>
      </>
  )
}



