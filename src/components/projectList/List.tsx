import userEvent from '@testing-library/user-event'
import { Button, Dropdown, Menu, MenuProps, Modal, Table, TableProps } from 'antd';
import { ButtonNoPadding } from 'components/Lib';
import Pin from 'components/Pin';
import dayjs from 'dayjs';
import React from 'react'
import { Link } from 'react-router-dom';
import { useDeleteProject, useEditProject } from 'utils/project';
import { useProjectModal, useProjectQueryKey } from 'utils/projectSearchParam';
import { Project } from '../../types/Project';
import { User } from "../../types/User";
interface ListProps extends TableProps<Project> {
  users: User[],

}
export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  
  

  return <Table pagination={false} columns={[{
    title: <Pin checked={true} disabled={true} />,
    render(value, project) {
      return <Pin checked={project.pin} onCheckedChange={
        pinProject(project.id)
      } />
      // {点击收藏后发送请求}
    }
  }, {
    title: "名称",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render(value, project) {
      return <Link to={String(project.id)}>{project.name}</Link>
    }
  },
  {
    title: "部门",
    dataIndex: "organization",
  }, {
    title: "负责人",
    render(value, project) {
      return <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
    }
  },
  {
    title: "创建时间",
    render(value, project) {
      return <span>
        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
      </span>
    }
  }, {
    render(value, project) {
      return <More project={project} />


    }

  }]} {...props} />



}

const More=({project}:{project:Project})=>{
  const{startEdit}=useProjectModal();
  const editProject=(id:number)=>()=>startEdit(id);
  const{mutate:deleteProject}=useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject=(id:number)=>{
    Modal.confirm({
      title:'您是否确定删除?',
      content:'点击确定删除',
      okText:'确定',
      onOk(){
        deleteProject({id})

      }
    })
  }
  return <Dropdown overlay={
    <Menu>
      <Menu.Item onClick={editProject(project.id)} key={'edit'}>编辑</Menu.Item>
      <Menu.Item onClick={()=>confirmDeleteProject}key={'delete'}>删除</Menu.Item>

    </Menu>
    
  }  />
}
