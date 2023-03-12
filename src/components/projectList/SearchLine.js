import React from 'react'

export default function SearchLine(props) {
    
   const{users,param,setParam}=props;
    

  return (
    <form>
    {/* 建立表单输入框，根据输入的内容解构赋值更新状态 */}
       <input type="text" value={param.name} onChange={event=>setParam({
        ...param,
        name:event.target.value
       })}></input>

       <select value={param.personId} onChange={event=>setParam({
        ...param,
        personId:event.target.value
       })}>

        <option value={''}>负责人</option>
        {
            users.map(user=>
                <option key={user.id} value={user.id}>{user.name}</option>
            )
        }
       </select>
    </form>
  )
}
