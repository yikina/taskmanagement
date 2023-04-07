import List, { Project } from 'components/projectList/List'
import SearchLine from 'components/projectList/SearchLine'
import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useEffectOnce } from 'utils';
import styled from '@emotion/styled'
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/uses';
import { Typography } from 'antd';
import { useUrlQueryParam } from 'utils/url';


export default function ProjectListPage() {
  // 表示输入项目负责人的名字和id
    const [param,setParam]=useUrlQueryParam(['name','personId']);
    const debounceParam=useDebounce(param,2000);
    
    //页面加载时传入数据
    const {isLoading,error,data:list}=useProjects(debounceParam)

    const{data:users}=useUsers()


    


  return (
    <Container>
        <h1>项目列表</h1>
        <SearchLine users={users||[]} param={param} setParam={setParam}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>: null}
        <List loading={isLoading} users={users||[]} dataSource={list||[]}/>

    </Container>
  )
};

const Container=styled.div`
    padding:3.2rem
`
