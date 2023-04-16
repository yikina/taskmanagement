import styled from '@emotion/styled';
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox } from 'components/Lib';
import React, { useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project';
import { useProjectModal } from 'utils/projectSearchParam'
import UserSelect from './UserSelect';

export default function ProjectModal() {
  const { projectModalOpen, open, close, editingProject, isLoading } = useProjectModal();
  const useMutateProject =editingProject?useEditProject:useAddProject;

  const {mutateAsync,error,isLoading:mutateLoading}=useMutateProject();
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    mutateAsync({...editingProject,...values}).then(()=>{
      form.resetFields();
      close();

    })
  }

  const title = editingProject ? '编辑项目' : '创建项目';

  useEffect(() => {
    form.setFieldsValue(editingProject)
  },[editingProject,form]);


  return <Drawer forceRender={true} onClose={close} open={projectModalOpen} width={'100%'}>
    {<Container>
    {isLoading ? <Spin size={"large"} /> : <>
      <h2>{title}</h2>
      <ErrorBox error={error}/>
      <Form form={form} layout={"vertical"} style={{ width: '40rem' }} onFinish={onFinish}>
        <Form.Item label={"名称"} name={"name"}
          rules={[{ required: true, message: '请输入项目名称' }]}>
          <Input placeholder={'请输入项目名称'}/>
          </Form.Item>

          <Form.Item label={"部门"} name={"organization"}
          rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder={'请输入部门名称'}/>
          </Form.Item>

          <Form.Item label={"负责人"} name={"personId"}>
          <UserSelect defaultOptionName={'负责人'}/>
          </Form.Item>

          <Form.Item>
            <Button style={{textAlign:'center'}}loading={mutateLoading} type={"primary"} htmlType={"submit"}>提交</Button>
          </Form.Item>
      </Form>
    </>
    }</Container>}
  </Drawer>
}

const Container = styled.div`
height:80vh;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`


