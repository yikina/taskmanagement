import { Form, Input, Select } from 'antd';
import React from 'react'
import { Project } from "../../types/Project";
import { User } from '../../types/User';
import UserSelect from './UserSelect';
interface SearchLineProps {
  users: User[],
  param:Partial<Pick<Project,'name'|'personId'>>,
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
        <UserSelect defaultOptionName='负责人' value={param.personId} onChange={(value: any) => setParam({
        ...param,
        personId: value
      })}/>
      </Form.Item>
    </Form>
  )
}
