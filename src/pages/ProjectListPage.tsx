import List from 'components/projectList/List'
import SearchLine from 'components/projectList/SearchLine'
import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useEffectOnce } from 'utils';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled'


const apiUrl=process.env.REACT_APP_API_URL;

export default function ProjectListPage() {
    
    // 表示输入项目负责人的名字和id
    const [param,setParam]=useState({
        name:'',
        personId:''}
    );
    //自定义hooks防抖
    const debounceParam=useDebounce(param,2000);
    
    //options下可选的users列表
    const[users,setUsers]=useState([]);

    const[list,setList]=useState([]);

    const client=useHttp();
    

    //页面加载时传入数据
    useEffect(()=>{
        client('project',{data:cleanObject(debounceParam)}).then(setList)
    },[debounceParam]);

    useEffectOnce(()=>{
        client('users').then(setUsers)
    });


  return (
    <Container>
        <h1>项目列表</h1>
        <SearchLine users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>

    </Container>
  )
};

const Container=styled.div`
    padding:3.2rem
`
