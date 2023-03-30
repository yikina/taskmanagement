import { Form, Input, Select } from 'antd';
import React from 'react'
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchLineProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchLineProps['param']) => void;

}

export default function SearchLine({ users, param, setParam }: SearchLineProps) {




  return (
    <Form style={{marginBottom:'2rem'}}layout={"inline"}>
      {/* 建立表单输入框，根据输入的内容解构赋值更新状态 */}
      <Form.Item>
      <Input placeholder={'项目名'}
        type="text" value={param.name} onChange={event => setParam({
          ...param,
          name: event.target.value
        })}></Input>
      </Form.Item>
      <Form.Item>
      <Select value={param.personId} onChange={(value: any) => setParam({
        ...param,
        personId: value
      })}>

        <Select.Option value={''}>负责人</Select.Option>
        {
          users.map(user =>
            <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
          )
        }
      </Select>
      </Form.Item>
    </Form>
  )
}
