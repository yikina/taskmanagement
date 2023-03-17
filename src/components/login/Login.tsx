import { useAuth } from 'context/auth-context';
import React, { FormEvent, FormEventHandler } from 'react'

const apiUrl=process.env.REACT_APP_API_URL;

export default function Login() {
    const{login,user}=useAuth();


    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const username=(event.currentTarget.elements[0] as HTMLInputElement).value;
        const password=(event.currentTarget.elements[1] as HTMLInputElement).value;
        login({username,password})
    }
    
  return (
    <form onSubmit={handleSubmit}>
        {user && <p>user.name</p>}
        <div>
            <label htmlFor='username'>用户名</label>
            <input type="text" id={'username'}></input>
        </div>
        <div>
            <label htmlFor='password'>密码</label>
            <input type="password" id={'password'}></input>
        </div>
        <button type={'submit'}>登录</button>

    </form>
  )
}
