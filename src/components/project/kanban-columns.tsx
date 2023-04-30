import React from 'react'
import { Kanban } from 'types/kanban'
import { useTask } from 'utils/task'
import { useTaskTypes } from 'utils/task-type';
import { useTasksModal, useTasksSearchParams } from './utils';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';
import CreateTask from './CreateTask';

export default function KanbanColumns({ kanban }: { kanban: Kanban }) {
  const { data: allTasks } = useTask(useTasksSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

  const{startEdit}=useTasksModal()
  //待处理svg图片问题
  // const TaskTypeIcon = ({ id }: { id: number }) => {
  //   const { data } = useTaskTypes();
  //   const name = data?.find(taskType => taskType.id === id)?.name;
  //   if (!name) { return null }
  //   return <img alt={"task-icon"} src={name === 'task' ? taskIcon : bugIcon}></img>


  // }
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
      {
        tasks?.map(task => <Card onClick={()=>startEdit(task.id)} style={{marginBottom:'0.5rem',cursor:'pointer'}} key={task.id}>
          {/* <TaskTypeIcon id={task.typeId} /> */}
          <div>{task.name}</div></Card>)
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
