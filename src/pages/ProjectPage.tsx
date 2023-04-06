import Epic from 'components/project/Epic'
import Kanban from 'components/project/Kanban'
import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

export default function ProjectPage() {
  return (
    <div>
        <h1>ProjectPage</h1>
    <Link to={'kanban'}>看板</Link>    
    <Link to={'epic'}>任务组</Link>    
    <Routes>
        <Route path={'kanban'} element={<Kanban/>}></Route>
        <Route path={'epic'} element={<Epic/>}></Route>
        <Navigate to={window.location.pathname+'/kanban'}/>
        
    </Routes>
    </div>
  )
}
