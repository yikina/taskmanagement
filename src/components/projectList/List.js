import userEvent from '@testing-library/user-event'
import React from 'react'

export default function List({ users, list }) {
  

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
