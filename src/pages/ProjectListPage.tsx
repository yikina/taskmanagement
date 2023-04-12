import List, { Project } from 'components/projectList/List'
import SearchLine from 'components/projectList/SearchLine'
import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useDocumentTitle, useEffectOnce } from 'utils';
import styled from '@emotion/styled'
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/uses';
import { Button, Typography } from 'antd';
import { useUrlQueryParam } from 'utils/url';
import { useProjectsSearchParam } from 'utils/projectSearchParam';
import { Row } from 'components/Lib';


export default function ProjectListPage(props:{projectButton:JSX.Element}) {
  useDocumentTitle("项目列表",false);
  // 表示输入项目负责人的名字和id
    const [param,setParam]=useProjectsSearchParam();
    //页面加载时传入数据
    const {isLoading,error,data:list}=useProjects(useDebounce(param,200));
    const{data:users}=useUsers()


    


  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
        <SearchLine users={users||[]} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>: null}
        <List projectButton={props.projectButton} loading={isLoading} users={users||[]} dataSource={list||[]}/>

    </Container>
  )
};

const Container=styled.div`
    padding:3.2rem
`
