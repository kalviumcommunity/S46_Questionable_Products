import React from 'react'
import './Post.css'

function Post({image, title, category, description, votes}) {
  return (
    <div>
    <div class="card">
      
    <div class="heading">
      {title}     
    </div>
    <div class="card-image">

        <img src={image} alt="" />
    </div>

    <div className='description'>
      {description}
   </div>
   <div className='category'>Category: {category}</div>
   <h1>{votes}</h1>

<   div className='buttons'>
    <button className='upvote'>UPVOTE</button>
    <button className="update">UPDATE</button>
    <button className="delete">DELETE</button>
    </div>
    </div>
    </div>
  )
}

export default Post