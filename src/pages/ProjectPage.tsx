import styled from '@emotion/styled'
import { Menu } from 'antd'
import { ScreenContainer } from 'components/Lib'
import Epic from 'components/project/Epic'
import Kanban from 'pages/Kanban'
import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

const useRouteType=()=>{
  const units=useLocation().pathname.split('/');
  return units[units.length-1];
}
export default function ProjectPage() {
  const routeType=useRouteType();
  return (
    <Container>
        <h1>ProjectPage</h1>
    <Aside>
    <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
    </Aside>
    <Main>
    <Routes>
        <Route path={'kanban'} element={<Kanban/>}></Route>
        <Route path={'epic'} element={<Epic/>}></Route>
        <Route path={"*"} element={<Navigate to={window.location.pathname+'/kanban'} replace={true} />} />  
    </Routes>
    </Main>
    </Container>
  )
}
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;`
