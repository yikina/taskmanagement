import styled from '@emotion/styled';
import { Button } from 'antd';
import { Row } from 'components/projectList/Lib';
import { useAuth } from 'context/auth-context'
import ProjectListPage from 'pages/ProjectListPage'
import React from 'react'


export const AuthenticatedApp = () => {
    const { logout } = useAuth();

    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={2}>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                <Button onClick={logout}>登出</Button>
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
`;

const Main = styled.main`
  flex: 1;
`;