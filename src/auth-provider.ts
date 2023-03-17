import { User } from "components/projectList/SearchLine";

//类似功能firebase
const localStorageKey='__auth_provider_token__';

export const getToken=()=>window.localStorage.getItem(localStorageKey);

export const handleUserResponse=({user}:{user:User})=>{
    window.localStorage.setItem(localStorageKey,user.token || '');
    return user;

}

const apiUrl=process.env.REACT_APP_API_URL;
//登录
export const login=async (data:{username:string,password:string})=>{
   const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Context-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return handleUserResponse(await response.json());
    } else {
        return Promise.reject(data);
    }

}
//注册
export const register=async (data:{username:string,password:string})=>{
   const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Context-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return handleUserResponse(await response.json());
    } else {
        return Promise.reject(data);
    }

}

//登出
export const logout=async()=>window.localStorage.removeItem(localStorageKey);
