import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import SignUp from './page/SignIn'
import TodoPage from './page/TodoPage'


function Allroutes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/todo" element={<TodoPage/>}/>
        </Routes>
      
    </div>
  )
}

export default Allroutes
