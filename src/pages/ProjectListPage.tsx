import List, { Project } from 'components/projectList/List'
import SearchLine from 'components/projectList/SearchLine'
import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useDocumentTitle, useEffectOnce } from 'utils';
import styled from '@emotion/styled'
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/uses';
import { Button, Typography } from 'antd';
import { useUrlQueryParam } from 'utils/url';
import { useProjectModal, useProjectsSearchParam } from 'utils/projectSearchParam';
import { ButtonNoPadding, Row } from 'components/Lib';


export default function ProjectListPage() {
  useDocumentTitle("项目列表",false);
  // 表示输入项目负责人的名字和id
    const [param,setParam]=useProjectsSearchParam();
    //页面加载时传入数据
    const {isLoading,error,data:list}=useProjects(useDebounce(param,200));
    const{data:users}=useUsers();
    const {open}=useProjectModal();


    


  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={()=>{open()}}type={"link"}>创建项目</ButtonNoPadding>
      </Row>
        <SearchLine users={users||[]} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>: null}
        <List  loading={isLoading} users={users||[]} dataSource={list||[]}/>

    </Container>
  )
};

const Container=styled.div`
    padding:3.2rem
`
