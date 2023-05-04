import styled from '@emotion/styled';
import { Spin } from 'antd';
import { Drag, Drop } from 'components/DragAndDrop';
import { ScreenContainer } from 'components/Lib';
import CreateKanban from 'components/project/CreateKanban';
import{ KanbanColumns} from 'components/project/kanban-columns';
import SearchLine from 'components/project/SearchLine';
import TaskModal from 'components/project/TaskModal';
import { useKanbanPrarams, useProjectInurl, useTasksSearchParams } from 'components/project/utils';
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban';
import { useTask } from 'utils/task';

export default function Kanban() {
  useDocumentTitle('看板列表');
  const{data:kanbans,isLoading:kanbanisLoading}=useKanban(useKanbanPrarams());
  const{data:currentProject}=useProjectInurl();
  const{isLoading:taskisLoading}=useTask(useTasksSearchParams())
  const isLoading=kanbanisLoading||taskisLoading;

  return (
    <DragDropContext onDragEnd={()=>{}}>
    <ScreenContainer>
      <h1>${currentProject?.name}看板列表</h1>
      <SearchLine/>
      {isLoading ? <Spin size={'large'}/> :
      <Drop type={'COLUMN'} droppableId={'kanban'} direction={'horizontal'}>
      <ColumnsContainer>
      {kanbans?.map((kanban,index)=>
      <Drag index={index} draggableId={'kanban'+kanban.id}>
        <KanbanColumns kanban={kanban} key={kanban.id} /></Drag>)}
        <CreateKanban/>
        </ColumnsContainer>
        </Drop>}
        <TaskModal/>
    </ScreenContainer>
    </DragDropContext>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`


