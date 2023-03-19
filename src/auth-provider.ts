import { User } from "components/projectList/SearchLine";

const apiUrl=process.env.REACT_APP_API_URL;

//类似功能firebase
const localStorageKey='__auth_provider_token__';

export const getToken=()=>window.localStorage.getItem(localStorageKey);

export const handleUserResponse=({user}:{user:User})=>{
    window.localStorage.setItem(localStorageKey,user.token || "");
    return user;

}


//登录
export const login=(data:{username:string;password:string})=>{
    return fetch(`${apiUrl}/login`,{
         method:'POST',
         headers:{
             "Context-Type":"application/json",
         },
         body:JSON.stringify(data),
     }).then(async response=>{
         if(response.ok){
            return handleUserResponse(await response.json())
         }else{
             return Promise.reject(await response.json())
         }
     })
 
 }
//注册
export const register=(data:{username:string;password:string;})=>{
    return fetch(`${apiUrl}/register`,{
         method:"POST",
         headers:{
             "Context-Type":"application/json",
         },
         body:JSON.stringify(data)
     }).then(async response=>{
         if(response.ok){
            return handleUserResponse(await response.json())
         }else{
             return Promise.reject(await response.json())
         }
     })
 
 }

//登出
export const logout=async()=>window.localStorage.removeItem(localStorageKey);