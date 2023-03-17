import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider';
import { User } from "components/projectList/SearchLine";
import { error } from "console";

const AuthContext = React.createContext<{
    user:User | null,
    login:(form:AuthForm) => Promise<void>,
    register:(form:AuthForm) => Promise<void>,
    logout:()=> Promise<void>,
}|undefined>(undefined);
AuthContext.displayName = 'AuthContext';

interface AuthForm {
    username: string,
    password: string

}

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
//setUser等同于user => setUser(user)-point free
    const login = (form: AuthForm) =>
        auth.login(form).then(setUser);

    const register = (form: AuthForm) =>
        auth.register(form).then(user => setUser(user));
    
    const logout=()=>auth.logout().then(user=>setUser(null));

    return <AuthContext.Provider children={children} value={{user,login,register,logout}}></AuthContext.Provider>


}

export const useAuth=()=>{
    const context=React.useContext(AuthContext);
    if(!context){
        throw new Error('useAuth要在AuthProvider中使用')
    }
    return context;
}