import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { Row } from 'components/projectList/Lib';
import { useAuth } from 'context/auth-context'
import ProjectListPage from 'pages/ProjectListPage'
import React from 'react'
import { useDocumentTitle } from 'utils';


export const AuthenticatedApp = () => {
    const { logout,user} = useAuth();

const items = [
      { label: '登出', key: 'logout' }, // 菜单项务必填写 key
    ];
useDocumentTitle("项目列表",false);
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={2}>
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
            </Header>
            <Main>
                <ProjectListPage />
            </Main>
        </Container>
    )
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