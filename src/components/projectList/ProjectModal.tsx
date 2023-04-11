import { Button, Drawer } from 'antd'
import React from 'react'

export default function ProjectModal(props:{projectModalOpen:boolean,onClose:()=>void}) {
    const{projectModalOpen,onClose}=props;

  return <Drawer onClose={onClose} open={projectModalOpen} width={'100%'}>
  <Button onClick={onClose}>关闭</Button>

  </Drawer>
}
