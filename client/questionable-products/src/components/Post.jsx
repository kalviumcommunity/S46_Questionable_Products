import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import { getCookie } from "../components/helpers/Cookies.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Post({
  image,
  title,
  category,
  description,
  votes,
  postedBy,
  _id,
  onDelete,
  updateVotes,
  fromProfile,
}) {
  const [localVotes, setLocalVotes] = useState(votes);
  const jwtToken = getCookie("jwtToken");

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleUpdate = (_id) => {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/products/${_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
          params: { votes: localVotes + 1 },
        }
      )
      .then((res) => {
        updateVotes(_id);
        setLocalVotes((prevVotes) => prevVotes + 1);
      })
      .catch((err) => {
        if (localVotes > 0) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <div className="card">
        <div
          className="
        heading"
        >
          {title}
        </div>
        <div className="card-image">
          <img src={image} alt="Image of ${title} productz"/>
        </div>

        <div className="description">{description}</div>
        <div className="category">Category: {category}</div>
        <h1 className="votes">{localVotes ? localVotes : 0}</h1>
        <p>Posted By: {postedBy} </p>

        {!fromProfile ? (
          <div className="action-buttons">
            <button
              className="action upvote"
              onClick={(e) => handleUpdate(_id)}
            >
              UPVOTE
            </button>
          </div>
        ) : (
          <div className="action-buttons">
            <button className="action delete" onClick={handleDelete}>
              DELETE
            </button>
            <Link to={`/products/${_id}`}>
              <button className="button update">UPDATE</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
