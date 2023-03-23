import { Button } from 'antd';
import { useAuth } from 'context/auth-context'
import ProjectListPage from 'pages/ProjectListPage'
import React from 'react'

export const AuthenticatedApp=()=>{
    const{logout}=useAuth();

    return(
        <div>
            <Button onClick={logout}>登出</Button>
            <ProjectListPage/>
        </div>
    )
}
