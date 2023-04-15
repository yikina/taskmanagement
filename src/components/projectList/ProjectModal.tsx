import { Button, Drawer } from 'antd'
import React from 'react'
import { useProjectModal } from 'utils/projectSearchParam'

export default function ProjectModal() {
    const{projectModalOpen,open,close}=useProjectModal();

  return <Drawer onClose={close} open={projectModalOpen} width={'100%'}>
  <Button onClick={close}>关闭</Button>

  </Drawer>
}
