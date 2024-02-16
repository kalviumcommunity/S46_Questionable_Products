import React from 'react'
import './Post.css'
import imgg from '../assets/key_flw.jpg'

function Post() {
  return (
    <div>
    <div class="card">
        
    <div class="card-image">

        <img src={imgg} alt="" />
    </div>
    <div class="heading"> Guys, I think this product has a key flaw

    <div className='description'>
    Imagine opening a door with this key! How will you even hold it after inserting the key in keyhole?
   </div>
   <h1>40</h1>

<   div className='buttons'>
    <button className='upvote'>UPVOTE</button>
    <button className="update">UPDATE</button>
    <button className="delete">DELETE</button>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Post