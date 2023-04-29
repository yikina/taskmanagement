
import { Button } from 'antd';
import { Row } from 'components/Lib';
import UserSelect from 'components/projectList/UserSelect';
import React from 'react'
import { useSetUrlSearchParam } from 'utils/url';
import TaskTypeSelect from './TaskSelect';
import { useTasksSearchParams } from './utils'

export default function SearchLine() {
    const searchParams=useTasksSearchParams();
    const setSearchParams=useSetUrlSearchParam();
    const reset=()=>{
        setSearchParams({
            typeId:undefined,
            processorId:undefined,
            tagId:undefined,
            name:undefined
        })
    }
  return <Row marginBottom={4} gap={true}>
    <input placeholder={'任务名'} value={searchParams.name} onChange={evt=>setSearchParams({name:evt.target.value})} />
    <UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} onChange={val=>setSearchParams({processorId:val})} />
    <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId} onChange={val=>setSearchParams({typeId:val})}/>
<Button onClick={reset}>清除筛选器</Button>

  </Row>
}
