import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from './Navbar'
import Post from './Post'
import axios from 'axios'


function Home() {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(()=>{
    axios.get("https://questionable-products.onrender.com/products")
    .then(data=>{
      setData(data.data)
      console.log(data.data)
      setTimeout(() => {
        setLoading(false)
      }, 500);
    })

  },[])


  if (isLoading) {
    return(
      <div className='flexx'>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
      </div>)
}

  return (
    <div>
        <Navbar />
        <button className='posts'>Create Post</button>
        <div className='posts-container'>
        {
          data && data.map(post=>{
            return <Post {...post} key={post.id}/>
          } 
          )}
        </div>
    </div>
  )
}

export default Home