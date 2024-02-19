import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import Post from './Post'

function Home() {

  return (
    <div>
        <Navbar />
        <button className='posts'>Create Post</button>
        <div className='posts-container'>
        <Post />
        <Post />
        </div>
    </div>
  )
}

export default Home