import styled from '@emotion/styled';
import { Button, Divider, List, Popover, Typography } from 'antd'
import { ButtonNoPadding } from 'components/Lib';
import React from 'react'
import { useDispatch } from 'react-redux';
import { projectListActions } from 'store/api/projectlistApi';
import { useProjects } from 'utils/project';

export default function ProjectOpover() {
  const dispatch=useDispatch();
  const {data:projects,isLoading}=useProjects();
  const pinnedProjects=projects?.filter(project=>project.pin);

  const content = <ContentContainer>
    <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project=><List.Item.Meta title={project.name}/>)
      }
    </List>
    <Divider/>
    <ButtonNoPadding onClick={()=>dispatch(projectListActions.openProjectModal())} type={"link"}>创建项目</ButtonNoPadding>
  </ContentContainer>
  return (
    <Popover placement={"bottom"} content={content}>
      <h3>项目</h3>
    </Popover>
  )
}

const ContentContainer=styled.div`
min-width:30rem;`

