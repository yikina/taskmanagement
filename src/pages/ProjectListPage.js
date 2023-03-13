import List from 'components/projectList/List'
import SearchLine from 'components/projectList/SearchLine'
import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useEffectOnce } from 'utils';
import qs from 'qs';


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
    

    //页面加载时传入数据
    useEffect(()=>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response=>{
            if(response.ok){
                setList(await response.json())
            }
        })
    },[debounceParam]);

    useEffectOnce(()=>{
        fetch(`${apiUrl}/users`).then(async response=>{
            if(response.ok){
                setUsers(await response.json())
            }
        })
    });


  return (
    <div>
        <SearchLine users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>

    </div>
  )
}
