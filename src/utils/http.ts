import { AuthProvider, useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from 'auth-provider';
import { useCallback } from "react";

const apiUrl=process.env.REACT_APP_API_URL;

interface Config extends RequestInit{
    data?:object,
    token?:string,
}
//服务端返回异常时，fetch api不会抛出异常——不能使用catch/axios可以
export const http=async(endpoint:string,{data,token,headers,...customConfig}:Config={})=>{
    const config={
        method:'GET',
        headers:{
            Authorization:token ? `Bearer ${token}` : '',
            'Context-Type':data ?
            'application/json' : '',
        },
        ...customConfig
    }

    if(config.method.toUpperCase()==='GET'){
        endpoint+=`?${qs.stringify(data)}`
    }else{
        config.body=JSON.stringify(data||{});
    }

    return window.fetch(`${apiUrl}/endpoint`,config).then(async response=>{
        if(response.status===401){
            await auth.logout();
            window.location.reload();
            return Promise.reject({message:'请重新登录'})

        }
        const data=await response.json();
        if(response.ok){
            return data
        }else{
            return Promise.reject(data);
        }

    })

}

export const useHttp=()=>{
    const {user}=useAuth();
    return useCallback((...[endpoint,config]:Parameters<typeof http>)=> http(endpoint,{...config,token:user?.token}),[user?.token])

}