import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { Row } from 'components/Lib';
import { useAuth } from 'context/auth-context'
import ProjectListPage from 'pages/ProjectListPage'
import React from 'react'
import { resetRoute, useDocumentTitle } from 'utils';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProjectPage from 'pages/ProjectPage';


export const AuthenticatedApp = () => {
    


useDocumentTitle("项目列表",false);
    return (
        <Container>
          <PageHeader/>
            <Main>
                <ProjectListPage />
               <Routes>
                <Route path={'/projects'} element={<ProjectListPage/>} />
                <Route path={'/projects/:projectId/*'} element={<ProjectPage/>} />
                <Navigate to={'/projects'}/>
               </Routes>
            </Main>
        </Container>
    )
}

const PageHeader=()=>{
  const { logout,user} = useAuth();
  const items = [
    { label: '登出', key: 'logout' }, // 菜单项务必填写 key
  ];
  return (
  <Header between={true}>
  <HeaderLeft gap={2}>
    <Button type={'link'} onClick={resetRoute}>主页</Button>
      <h3>项目</h3>
      <h3>用户</h3>
  </HeaderLeft>
  <HeaderRight>
  <Dropdown menu={{items}}>
    <Button type={"link"} onClick={e=>e.preventDefault()}>
      Hi,{user?.name}
    </Button>
  </Dropdown>
</HeaderRight>
</Header>)

}

const HeaderLeft = styled(Row)``
const HeaderRight = styled(Row)``

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled(Row)`
  height: 6rem;
  padding:3.2rem;
  box-shadow:0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`;

const Main = styled.main`
  flex: 1;
`;