import IdSelect from 'components/projectList/id-select';
import React from 'react'
import { useTaskTypes } from 'utils/task-type';


export default function TaskTypeSelect(props:React.ComponentProps<typeof IdSelect>) {
  const{data:tasks}=useTaskTypes();
  return <IdSelect options={tasks||[]} {...props}></IdSelect>
}
