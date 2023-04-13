import { Button, Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { projectListActions, selectProjectModalOpen } from 'store/api/projectlistApi';

export default function ProjectModal() {
    const dispatch=useDispatch();
    const projectModalOpen=useSelector(selectProjectModalOpen);

  return <Drawer onClose={()=>dispatch(projectListActions.closeProjectModal())} open={projectModalOpen} width={'100%'}>
  <Button onClick={()=>dispatch(projectListActions.closeProjectModal())}>关闭</Button>

  </Drawer>
}
