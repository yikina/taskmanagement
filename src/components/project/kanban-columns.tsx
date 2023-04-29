import React from 'react'
import { Kanban } from 'types/kanban'
import { useTask } from 'utils/task'
import { useTaskTypes } from 'utils/task-type';
import { useTasksSearchParams } from './utils';
import taskIcon from 'assets/task.svg';
import bugIcon from 'assets/bug.svg';
import styled from '@emotion/styled';
import { Card } from 'antd';

export default function KanbanColumns({ kanban }: { kanban: Kanban }) {
  const { data: allTasks } = useTask(useTasksSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

  const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data } = useTaskTypes();
    const name = data?.find(taskType => taskType.id === id)?.name;
    if (!name) { return null }
    return <img src={name === 'task' ? taskIcon : bugIcon}></img>


  }
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
      {
        tasks?.map(task => <Card style={{marginBottom:'0.5rem'}} key={task.id}>
          <TaskTypeIcon id={task.typeId} />
          <div>{task.name}</div></Card>)
      }
      </TaskContainer>
    </Container>
  )
}

const Container = styled.div`
min-width:27rem;
border-radius: 6px;
background-color: rgb(244, 245, 247);
display:flex;
flex-direction:column;
padding:0.7rem 0.7rem 1rem;
margin-right:1.5rem;
`
const TaskContainer=styled.div`
  overflow:scroll;
  flex:1;
  ::-webkit-scrollbar{
    display:none;
  }
`
