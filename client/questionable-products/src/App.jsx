import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from './components/UpdateProduct'
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';


function App() {

  return (
    <>
    <ToastContainer theme="dark" />
    <Routes>
      <Route path='/' element= {<LandingPage />} ></Route>
      <Route path='/login' element= {<Login />} ></Route>
      <Route path='/home' element= {<Home />} ></Route>
      <Route path='/signup' element= {<Signup/>} ></Route> 
      <Route path='/profile' element= {<Profile />} ></Route>
      <Route path='/products/:id' element= {<UpdateProduct />} ></Route>
    </Routes>

    </>
  )
}

export default App
