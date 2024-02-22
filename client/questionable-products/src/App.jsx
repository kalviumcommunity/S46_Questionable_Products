import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import UpdateProduct from './components/UpdateProduct'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element= {<Home />} ></Route>
      <Route path='/signup' element= {<Signup/>} ></Route> 
      <Route path='/products/:id' element= {<UpdateProduct />} ></Route>
    </Routes>

    </>
  )
}

export default App
