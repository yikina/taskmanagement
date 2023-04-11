import { List, Popover, Typography } from 'antd'
import React from 'react'
import { useProjects } from 'utils/project';

export default function ProjectOpover() {
  const {data:projects,isLoading}=useProjects();
  const pinnedProjects=projects?.filter(project=>project.pin);

  const content = <div>
    <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project=><List.Item.Meta title={project.name}/>)
      }
    </List>
  </div>
  return (
    <Popover placement={"bottom"} content={content}>
      <h3>项目</h3>
    </Popover>
  )
}
