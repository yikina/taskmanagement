import { Button, Form, Input, Modal } from 'antd';
import UserSelect from 'components/projectList/UserSelect';
import React, { useEffect } from 'react'
import { useDeleteTask, useEditTask, useTaskDetails } from 'utils/task';
import TaskTypeSelect from './TaskSelect';
import { useTasksModal, useTasksQueryKey } from './utils';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

export default function TaskModal() {
    const [form] = Form.useForm();
    const{editingTaskId,editingTask,close}=useTasksModal();
    const{mutateAsync:editTask,isLoading:editLoading}=useEditTask(useTasksQueryKey());
    const{mutateAsync:deleteTask}=useDeleteTask(useTasksQueryKey());

    const onCancel=()=>{
        close();
        form.resetFields();
    }

    const onOk=async ()=>{
        await editTask({...editingTask,...form.getFieldsValue()});
        close();

    }
    const startDelete=()=>{
      close();
      Modal.confirm({
        okText:"确定",
        cancelText:"取消",
        title:"确定删除任务吗？",
        onOk(){
          return deleteTask({id:Number(editingTaskId)})
        }
      })
    }

    useEffect(()=>{
        form.setFieldsValue(editingTask);
    },[form,editingTask])

  return (
    <Modal 
    onCancel={onCancel} onOk={onOk}
    cancelText={'取消'} okText={'确认'}
    confirmLoading={editLoading}
    title={'编辑任务'}
    visible={!!editingTaskId}
    forceRender={true}
    >
    <Form {...layout} initialValues={editingTask} form={form}>
        
    <Form.Item
    label={'任务名'}
    name={'name'}
    rules={[{required:true,message:"请输入任务名"}]}>
        <Input/>
    </Form.Item>

    <Form.Item label={'经办人'} name={'processorId'}>
    <UserSelect defaultOptionName={'经办人'}/>
    </Form.Item>

    <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName={'类型'} />
        </Form.Item>
    </Form>
    <div style={{textAlign:"right"}}>
      <Button
      onClick={startDelete}
      size={"small"}>
        删除
      </Button>
    </div>
    </Modal>
  )
}
