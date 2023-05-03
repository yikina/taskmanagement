import React from 'react'
import { Kanban } from 'types/kanban'
import { useTask } from 'utils/task'
import { useTaskTypes } from 'utils/task-type';
import { useKanbanQueryKey, useTasksModal, useTasksSearchParams } from './utils';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import CreateTask from './CreateTask';
import { Task } from 'types/task';
import Mark from './Mark';
import { useDeleteKanban } from 'utils/kanban';
import { Row } from 'components/Lib';

const TaskCard=({task}:{task:Task})=>{
  const{startEdit}=useTasksModal();
  const{name:keyword}=useTasksSearchParams();
  return <Card onClick={()=>startEdit(task.id)} style={{marginBottom:'0.5rem',cursor:'pointer'}} key={task.id}>
   <Mark name={task.name} keyword={keyword}/>
  {/* <TaskTypeIcon id={task.typeId} /> */}
  </Card>
  

}

const More=({kanban}:{kanban:Kanban})=>{
  const{mutateAsync}=useDeleteKanban(useKanbanQueryKey());
  const confirmDeleteKanban=()=>{
    Modal.confirm({
      okText:'确定',
      cancelText:'取消',
      title:'确定删除看板吗？',
      onOk(){
        return mutateAsync({id:kanban.id})
      }
    })
  }
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={confirmDeleteKanban}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );


}

export default function KanbanColumns({ kanban }: { kanban: Kanban }) {
  const { data: allTasks } = useTask(useTasksSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

 
  //待处理svg图片问题
  // const TaskTypeIcon = ({ id }: { id: number }) => {
  //   const { data } = useTaskTypes();
  //   const name = data?.find(taskType => taskType.id === id)?.name;
  //   if (!name) { return null }
  //   return <img alt={"task-icon"} src={name === 'task' ? taskIcon : bugIcon}></img>


  // }
  return (
    <Container>
      <Row between={true}>
      <h3>{kanban.name}</h3>
      <More kanban={kanban} key={kanban.id}/>
      </Row>
      <TaskContainer>
      {
        tasks?.map(task =><TaskCard key={task.id} task={task}/> )
      }
      <CreateTask kanbanId={kanban.id}/>
      </TaskContainer>
    </Container>
  )
}

export const Container = styled.div`
min-width:27rem;
border-radius: 6px;
background-color: rgb(244, 245, 247);
display:flex;
flex-direction:column;
padding:0.7rem 0.7rem 1rem;
margin-right:1.5rem;
`
export const TaskContainer=styled.div`
  overflow:scroll;
  flex:1;
  ::-webkit-scrollbar{
    display:none;
  }
`
