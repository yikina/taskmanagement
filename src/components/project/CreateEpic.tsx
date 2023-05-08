import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd'
import { ErrorBox } from 'components/Lib'
import { Container } from 'components/projectList/ProjectModal'
import React, { useEffect } from 'react'
import { useAddEpic } from 'utils/Epic'
import { useEpicsQueryKey, useProjectidInUrl } from './utils'

export default function CreateEpic(props:Pick<DrawerProps,'visible'> &{
    onclose:()=>void
}) {
    const{mutate:addEpic,isLoading,error}=useAddEpic(useEpicsQueryKey());
    const[form]=Form.useForm();
    const projectId = useProjectidInUrl();

  const onFinish = async (values: any) => {
    addEpic({ ...values, projectId });
    props.onclose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

    return (
        <Drawer 
        visible={props.visible}
        onClose={props.onclose}
        forceRender={true} 
        destroyOnClose={true}
        width={'100%'}>
    <Container>
    {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
    </Container>
        </Drawer>
    )
}
