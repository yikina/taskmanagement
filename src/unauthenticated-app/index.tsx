import { Button, Card, Divider } from 'antd';
import React, { useState } from 'react'
import Login from './login'

import styled from '@emotion/styled';
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg'
import Register from './register';

export default function UnauthenticatedApp() {
    const[isLogin,setLogin]=useState(false);

    const changeHandle=()=>{
        setLogin(!isLogin);
    }
  return (
    <Container>
   <Header/>
  
      <ShadowCard>
        <Title>
          {isLogin ? '请登录':'请注册'}
        </Title>
        {isLogin ? <Login/> : <Register/>}
      <Divider/>
        <a onClick={changeHandle}>{
            isLogin ? '没有账号，点击注册':'已有账号，直接登录'
        }</a></ShadowCard>
    </Container>
  )
};
const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`
const ShadowCard=styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding:3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center;
`
const Header=styled.header`
  background:url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width:100%;
`


const Title=styled.h2`
  margin-bottom: 2.4rem;
  color:rgb(94,108,132)
  `

export const LongButton=styled(Button)`
  width:100%
`