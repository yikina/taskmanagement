import { Button, Card, Divider, Typography } from 'antd';
import React, { useState } from 'react'
import Login from './login'

import styled from '@emotion/styled';
import logo from 'assets/logo.svg';
import Register from './register';
import { useDocumentTitle } from 'utils';
import { ErrorBox } from 'components/Lib';

export default function UnauthenticatedApp() {
    const[isLogin,setLogin]=useState(false);
    const[error,setError]=useState<Error |null>(null);

    const changeHandle=()=>{
        setLogin(!isLogin);
    }
    useDocumentTitle("请登录或注册")
  return (
    <Container>
   <Header/>
  
      <ShadowCard>
        <Title>
          {isLogin ? '请登录':'请注册'}
        </Title>
        <ErrorBox error={error}/>
        {isLogin ? <Login onError={setError}/> : <Register onError={setError}/>}
      <Divider/>
        <Button type={"link"} onClick={changeHandle}>{
            isLogin ? '没有账号，点击注册':'已有账号，直接登录'
        }</Button></ShadowCard>
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