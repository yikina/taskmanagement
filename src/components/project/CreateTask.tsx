import { Button, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import { useAddKanban } from 'utils/kanban';
import { useAddtask, useTask } from 'utils/task';
import { useKanbanQueryKey, useProjectidInUrl, useTasksQueryKey } from './utils';

export default function CreateTask({ kanbanId }: { kanbanId: number }) {
    const [name, setname] = useState('');
    const [inputMode, setinputMode] = useState(false);
    const projectId = useProjectidInUrl();
    const { mutateAsync: addTask } = useAddtask(useTasksQueryKey());

    const submit = async () => {
        await addTask({ name, projectId, kanbanId });
        setname('');
        setinputMode(false);
    }

    const toggle = () => setinputMode(!inputMode);

    useEffect(() => {
        if (!inputMode) {
            setname('');
        }
    }, [inputMode])

    if (!inputMode) {
        return <Button onClick={toggle}>创建任务</Button>
    }
    return <Card>
        <Input value={name} placeholder={'填写任务内容'} onPressEnter={submit} onChange={evt => setname(evt.target.value)} onBlur={toggle} autoFocus={true} />
    </Card>

    
}
