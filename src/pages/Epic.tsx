import { Row, ScreenContainer } from 'components/Lib';
import { useEpicSearchParams, useEpicsQueryKey, useProjectInurl } from 'components/project/utils';
import React, { useState } from 'react'
import { useDeleteEpic, useEpics } from 'utils/Epic';
import { Epic } from "types/epic";
import { Button, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTask } from 'utils/task';
import { Link } from 'react-router-dom';
import CreateEpic from 'components/project/CreateEpic';


export default function Epic() {
    const { data: currentProject } = useProjectInurl();
    const{data:epics}=useEpics(useEpicSearchParams());
    const{mutate:deleteEpic}=useDeleteEpic(useEpicsQueryKey());
    const { data: tasks } = useTask({ projectId: currentProject?.id });
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
          title: `确定删除项目组：${epic.name}`,
          content: "点击确定删除",
          okText: "确定",
          onOk() {
            deleteEpic({ id: epic.id });
          },
        });
      };
  return (
    <ScreenContainer>
         <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
        <List dataSource={epics} style={{overflow:'scroll'}} itemLayout={"vertical"} renderItem={(epic)=>(
            <List.Item>
                <List.Item.Meta
                title={<Row between={true}
                >
                <Button type={'link'} onClick={()=>confirmDeleteEpic(epic)}>
                删除</Button>    
                </Row>}
                description={<div>
                     <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>}
                />
                <div>
                {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
                </div>
            </List.Item>


        )}></List>
        <CreateEpic
        onclose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  )
}


