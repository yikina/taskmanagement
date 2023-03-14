import userEvent from '@testing-library/user-event'
import React from 'react'
import { User } from './SearchLine';
interface Project{
  id:string;
  name:string;
  personId:string;
  pin:boolean;
  organization:string;
}

interface ListProps{
  list:Project[],
  users:User[],
}
export default function List({ users, list }: ListProps) {
  

  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
        </thead>
        <tbody>
        {
          list.map(project => 
             <tr key={project.id}>
            <td>{project.name}</td>
            <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td></tr>

          )
        }
        </tbody>
      
    </table>
  )
}
