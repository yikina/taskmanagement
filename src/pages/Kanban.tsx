import styled from '@emotion/styled';
import { Spin } from 'antd';
import { Drag, Drop, DropChild } from 'components/DragAndDrop';
import { ScreenContainer } from 'components/Lib';
import CreateKanban from 'components/project/CreateKanban';
import { KanbanColumns } from 'components/project/kanban-columns';
import SearchLine from 'components/project/SearchLine';
import TaskModal from 'components/project/TaskModal';
import { useKanbanPrarams, useKanbanQueryKey, useProjectInurl, useTasksQueryKey, useTasksSearchParams } from 'components/project/utils';
import React, { useCallback } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDocumentTitle } from 'utils'
import { useKanban, useReorderKanban } from 'utils/kanban';
import { useReorderTask, useTask } from 'utils/task';

export default function Kanban() {
  useDocumentTitle('看板列表');
  const { data: kanbans, isLoading: kanbanisLoading } = useKanban(useKanbanPrarams());
  const { data: currentProject } = useProjectInurl();
  const { isLoading: taskisLoading } = useTask(useTasksSearchParams())
  const isLoading = kanbanisLoading || taskisLoading;

  return (
    <DragDropContext onDragEnd={() => { }}>
      <ScreenContainer>
        <h1>${currentProject?.name}看板列表</h1>
        <SearchLine />
        {isLoading ? <Spin size={'large'} /> :
          <ColumnsContainer>
            <Drop type={'COLUMN'} droppableId={'kanban'} direction={'horizontal'}>
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) =>
                  <Drag index={index} draggableId={'kanban' + kanban.id}>
                    <KanbanColumns kanban={kanban} key={kanban.id} /></Drag>)}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}
export const useDragEnd = () => {
  const{data:kanbans}=useKanban(useKanbanPrarams());
  const{mutate:reorderKanban}=useReorderKanban(useKanbanQueryKey());
  const{data:allTasks=[]}=useTask(useTasksSearchParams());
  const{mutate:reorderTask}=useReorderTask(useTasksQueryKey());
  return useCallback(({source,destination,type}:DropResult)=>{
    if(!destination){
      return
    }
    //看板
    if(type==='COLUMN'){
      const fromId=kanbans?.[source.index].id;
      const toId=kanbans?.[destination.index].id;
      if(!fromId || !toId || fromId===toId){
        return
      } 
      const type=destination.index>source.index?'after':'before';
      reorderKanban({fromId,referenceId:toId,type})
      
    }
    //task
    if (type === "ROW") {
      const fromKanbanId = +source.droppableId;
      const toKanbanId = +destination.droppableId;
      if (fromKanbanId === toKanbanId) {
        return;
      }
      const fromTask = allTasks.filter(
        (task) => task.kanbanId === fromKanbanId
      )[source.index];
      const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
        destination.index
      ];
      if (fromTask?.id === toTask?.id) {
        return;
      }
      reorderTask({
        fromId: fromTask?.id,
        referenceId: toTask?.id,
        fromKanbanId,
        toKanbanId,
        type:
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before",
      });
    }


  },[kanbans,reorderKanban,allTasks,reorderTask])
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`


