import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider';

import { http } from "utils/http";
import { useEffectOnce } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageError, FullPageLoading } from "components/Lib";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "components/projectList/SearchLine";
interface AuthForm {
    username: string;
    password: string;

}
const bootstrapUser=async()=>{
    let user=null;
    const token=auth.getToken();
    if(token){
        const data=await http('me',{token})
        user=data.user
    }
    return user;
}

const AuthContext = React.createContext<{
    user:User | null,
    login:(form:AuthForm) => Promise<void>,
    register:(form:AuthForm) => Promise<void>,
    logout:()=> Promise<void>,
}|undefined>(undefined);
AuthContext.displayName = "AuthContext";


export const AuthProvider = ({children}:{children:ReactNode}) => {
    const{data:user,error,isLoading,isIdle,isError,run,setData:setUser}=useAsync<User | null>()
//setUser等同于user => setUser(user)-point free
    const queryClient=useQueryClient();
    
    const login = (form: AuthForm) =>
        auth.login(form).then(setUser);

    const register = (form: AuthForm) =>
        auth.register(form).then(setUser);
    
    const logout=()=>auth.logout().then(()=>{
        setUser(null);
        queryClient.clear();
    });

    useEffectOnce(()=>{
        run(bootstrapUser())
    })
    if(isIdle||isLoading){
        return <FullPageLoading/>
    }
    if(isError){
        return <FullPageError error={error}/>
    }
    
    return <AuthContext.Provider children={children} value={{user,login,register,logout}} />


}



export const useAuth=()=>{
    const context=React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth要在AuthProvider中使用')
    }
    return context;
}