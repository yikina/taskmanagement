import { Input } from 'antd';
import { ColumnsContainer } from 'pages/Kanban';
import React, { useState } from 'react'
import { useAddKanban } from 'utils/kanban';
import { Container } from './kanban-columns';
import { useKanbanQueryKey, useProjectidInUrl, useProjectInurl } from './utils';

export default function CreateKanban() {
    const[name,setname]=useState('');
    const projectId=useProjectidInUrl();
    const{mutateAsync:addKanban}=useAddKanban(useKanbanQueryKey());
    const submit=async()=>{
        await addKanban({name,projectId});
        setname('')
    }
  return (
    <Container>
    <Input size={'large'} placeholder={'新建看板'} onPressEnter={submit} value={name} onChange={evt=>setname(evt.target.value)}/>
    </Container>
  )
}
