import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'

import Register from './components/auth/Register'



function App() {


  return (
    
    <Routes>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>

    
    </Routes>
  )
}

export default App
