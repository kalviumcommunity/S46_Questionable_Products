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
      .put(import.meta.env.VITE_API_URL + "/products/"+ id, {
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
        <h1 className="votes">{localVotes ? localVotes : 0}</h1>

        <div className="action-buttons">
          <button className="action upvote" onClick={(e) => handleUpdate(_id)}>
            UPVOTE
          </button>

          <Link to={`/products/${_id}`}>
            <button className="button update">UPDATE</button>
          </Link>
          <button className="action delete" onClick={handleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
