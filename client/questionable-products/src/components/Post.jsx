import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Post({ image, title, category, description, votes, _id, onDelete, updateVotes}) {
  const [localVotes, setLocalVotes] = useState(votes);

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleUpdate = (id) => {
    setLocalVotes((prevVotes) => prevVotes + 1);

    axios
      .put(`https://questionable-products.onrender.com/products/${id}`, {
        votes: localVotes + 1,
      })
      .then((res) => {
        updateVotes(_id)
      })
      .catch((err) => {
        console.log(err);
        setLocalVotes((prevVotes) => prevVotes - 1);
      });

  };

  return (
    <div>
      <div className="card">
        <div className="heading">{title}</div>
        <div className="card-image">
          <img src={image} alt="" />
        </div>

        <div className="description">{description}</div>
        <div className="category">Category: {category}</div>
        <h1>{localVotes ? localVotes : 0}</h1>

        <div className="buttons">
          <button className="upvote" onClick={(e) => handleUpdate(_id)}>
            UPVOTE
          </button>

          <Link to={`/products/${_id}`}>
            <button className="update">UPDATE</button>
          </Link>
          <button className="delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
