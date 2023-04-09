import IdSelect from 'components/projectList/id-select';
import React from 'react'
import { useUsers } from 'utils/uses';

export default function UserSelect(props:React.ComponentProps<typeof IdSelect>) {
  const{data:users}=useUsers();
  return <IdSelect options={users||[]} {...props}></IdSelect>
}
