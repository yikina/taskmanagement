import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
import{Form,Input,Button} from 'antd';
import { LongButton } from 'unauthenticated-app';



export default function Login() {
    const{login}=useAuth();


    const handleSubmit=(values:{username:string,password:string})=>{
        login(values)
    }
    
  return (
    <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{required:true,message:'请输入用户名'}]}>
            <Input placeholder={'用户名'} type="text" id={"username"}></Input>
            </Form.Item>
       
            <Form.Item name={'password'} rules={[{required:true,message:'请输入密码'}]} >
            <Input placeholder={'密码'}type="password" id={"password"}></Input>
            </Form.Item>
        <Form.Item>
        <LongButton htmlType={'submit'} type={"primary"}>登录</LongButton>
        </Form.Item>
    </Form>
  )
}
