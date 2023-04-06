import userEvent from '@testing-library/user-event'
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react'
import { Link } from 'react-router-dom';
import { User } from './SearchLine';
export interface Project{
  id:string;
  name:string;
  personId:string;
  pin:boolean;
  organization:string;
  created:number;
}

interface ListProps extends TableProps<Project>{
  users:User[],
}
export default function List({ users,...props}: ListProps) {
  return <Table pagination={false} columns={[{
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
 },]} {...props} />
  

  
}
