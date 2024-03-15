"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../components/helpers/Cookies.js";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import Post from "./Post";
import "./Profile.css";
import CreateProduct from "./CreateProduct";

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateProduct, setshowCreateProduct] = useState(false);
  const jwtToken = getCookie("jwtToken");
  const username = getCookie("username");
  const words = [
    {
      text: "Hey",
    },
    {
      text: "There",
    },
    {
      text: username,
      className: "dark:text-purple-600",
    },
  ];

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        const filteredPosts = response.data.filter(
          (post) => post.postedBy === username
        );
        setUserPosts(filteredPosts);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flexx">
        <svg className="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }
  const handleCreatePostClick = () => {
    setshowCreateProduct(true);
  };

  const handleCreatePost = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((data) => {
        console.log(data.data);
        setUserPosts(data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setshowCreateProduct(false);
  };

  const handlePostDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/products/" + id, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        toast.error("Post Deleted Successfully");
        setTimeout(() => { 
          window.location.reload()
        }, 1500)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleCloseModal = () => {
    setshowCreateProduct(false);
  };

  return (
    <div>
      <div className="hero">
        <div>
          <h1 className="top">
            <TypewriterEffectSmooth words={words} />
          </h1>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <button className="posts" onClick={handleCreatePostClick}>
        Create Post
      </button>
      {showCreateProduct && (
        <CreateProduct
          onCreatePost={handleCreatePost}
          onClose={handleCloseModal}
        />
      )}
      <div className="posts-container">
        <h1 className="heading">Your posts</h1>
        {userPosts.map((post) => (
          <Post
            {...post}
            key={post._id}
            onDelete={handlePostDelete}
            fromProfile
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
