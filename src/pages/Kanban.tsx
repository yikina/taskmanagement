import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ScreenContainer } from 'components/Lib';
import CreateKanban from 'components/project/CreateKanban';
import KanbanColumns from 'components/project/kanban-columns';
import SearchLine from 'components/project/SearchLine';
import { useKanbanPrarams, useProjectInurl, useTasksSearchParams } from 'components/project/utils';
import React from 'react'
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
    <ScreenContainer>
      <h1>${currentProject?.name}看板列表</h1>
      <SearchLine/>
      {isLoading ? <Spin size={'large'}/> : <ColumnsContainer>
      {kanbans?.map(kanban=>
        <KanbanColumns kanban={kanban} key={kanban.id} />)}
        </ColumnsContainer>} 
        <CreateKanban/>
    </ScreenContainer>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`


