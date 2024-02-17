import React from 'react'
import "./Signup.css"
import imgg from "../assets/24237566_6922095.jpg"
import { Link } from 'react-router-dom'



function Signup() {

  return (
    <div className='wrapper'>
        <div className='left'>
            <img src={imgg} alt="" />
        </div>
        <div className='right'>
            <h1 className='top'>questionable <br></br>products</h1>
            <div className='form'>
            <h2>Explore mind boggling products</h2>
            <input className='username' type="text" placeholder='username/email' />
            <input className='password' type="password" placeholder='password' />
            <Link to='/'>
              <button className='signup'>Sign Up</button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Signup