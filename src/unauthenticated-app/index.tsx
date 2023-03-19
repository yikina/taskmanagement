import React, { useState } from 'react'
import Login from './login'
import Register from './register'

export default function UnauthenticatedApp() {
    const[isRegister,setRegister]=useState(false);

    const changeHandle=()=>{
        setRegister(!isRegister);
    }
  return (
    <div>
        {isRegister ? <Login/> : <Register/>}
        <button onClick={changeHandle}>切换到{
            isRegister ? '注册':'登录'
        }</button>
    </div>
  )
}
