import userEvent from '@testing-library/user-event'
import { Button, Dropdown, MenuProps, Table, TableProps } from 'antd';
import { ButtonNoPadding } from 'components/Lib';
import Pin from 'components/Pin';
import dayjs from 'dayjs';
import React from 'react'
import { Link } from 'react-router-dom';
import { useEditProject } from 'utils/project';
import { User } from './SearchLine';
export interface Project{
  id:number;
  name:string;
  personId:number;
  pin:boolean;
  organization:string;
  created:number;
}

interface ListProps extends TableProps<Project>{
  users:User[],
  projectButton:JSX.Element;
}
export default function List({ users,...props}: ListProps) {
  const {mutate}=useEditProject();
  const pinProject=(id:number)=>(pin:boolean)=>mutate({id,pin});
  const items:MenuProps['items']=[{
    key:'1',
    //待修改
    // label:({props.projectButton})
  }]

  return <Table pagination={false} columns={[{
    title:<Pin checked={true} disabled={true} />,
    render(value,project){
      return <Pin checked={project.pin} onCheckedChange={
        pinProject(project.id)
      } />
      // {点击收藏后发送请求}
    }
  },{
    title:"名称",
    sorter:(a,b)=>a.name.localeCompare(b.name),
    render(value,project){
      return <Link to={String(project.id)}>{project.name}</Link>
    }
  },
  {
     title:"部门",
     dataIndex:"organization",
  },{
    title:"负责人",
    render(value,project){
      return<span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
    }
  },
  {
    title:"创建时间",
    render(value,project){
      return <span>
        {project.created ? dayjs(project.created).format('YYYY-MM-DD'):'无'}
      </span>
    }
 },{
    render(value,project){
      return <Dropdown menu={{items}} />

      
    }

 }]} {...props} />
  

  
}
