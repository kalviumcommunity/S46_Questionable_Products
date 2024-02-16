import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element= {<Home />} ></Route>
      <Route path='/signup' element= {<Signup/>} ></Route> 
 
    </Routes>

    </>
  )
}

export default App
