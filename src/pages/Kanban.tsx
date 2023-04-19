import styled from '@emotion/styled';
import KanbanColumns from 'components/project/kanban-columns';
import { useKanbanPrarams, useProjectInurl } from 'components/project/utils';
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban';

export default function Kanban() {
  useDocumentTitle('看板列表');
  const{data:kanbans}=useKanban(useKanbanPrarams());
  const{data:currentProject}=useProjectInurl()
  return (
    <div>
      <h1>${currentProject?.name}看板列表</h1>
      {kanbans?.map(kanban=>
        <KanbanColumns kanban={kanban} key={kanban.id} />)}

    </div>
  )
}

const Container=styled.div`
  display:flex;
  flex-direction:column;
  overflow: hidden;
  margin-right: 2rem;
`
