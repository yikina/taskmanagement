import styled from '@emotion/styled';
import { ScreenContainer } from 'components/Lib';
import KanbanColumns from 'components/project/kanban-columns';
import SearchLine from 'components/project/SearchLine';
import { useKanbanPrarams, useProjectInurl } from 'components/project/utils';
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban';

export default function Kanban() {
  useDocumentTitle('看板列表');
  const{data:kanbans}=useKanban(useKanbanPrarams());
  const{data:currentProject}=useProjectInurl()
  return (
    <ScreenContainer>
      <h1>${currentProject?.name}看板列表</h1>
      <SearchLine/>
      <ColumnsContainer>
      {kanbans?.map(kanban=>
        <KanbanColumns kanban={kanban} key={kanban.id} />)}
        </ColumnsContainer>

    </ScreenContainer>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`


