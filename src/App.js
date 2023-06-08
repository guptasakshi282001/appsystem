import React from 'react'
import Login from './login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Profile from './profile'
import UpdateProfile from './updateprofile'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path = '/profile' element={<Profile />}></Route>
      <Route path = '/updateprofile' element={<UpdateProfile />}></Route>
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App