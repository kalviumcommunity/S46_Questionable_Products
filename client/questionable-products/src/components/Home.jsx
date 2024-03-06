import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Post from "./Post";
import axios from "axios";
import CreateProduct from "./CreateProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateProduct, setshowCreateProduct] = useState(false);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/products").then((data) => {
      setData(data.data);
      setLoading(false);
    });
  });

  const handleCreatePostClick = () => {
    setshowCreateProduct(true);
  };

  const handleCreatePost = () => {
    axios.get(import.meta.env.VITE_API_URL + "/products").then((data) => {
      setData(data.data);
    });
    setshowCreateProduct(false);
  };

  const handleCloseModal = () => {
    setshowCreateProduct(false);
  };

  const handlePostDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/products/" + id)
      .then(() => {
        toast.error("Post Deleted Successfully");
      })
      .catch((err) => {
        toast.error("Failed to delete post");
      });
  };

  const updateVotes = () => {
    toast.success("Vote Updated Successfully", {
      position: "bottom-center",
      autoClose: 900,
      hideProgressBar: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flexx">
        <svg className="spinner" viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <button className="posts" onClick={handleCreatePostClick}>
        Create Post
      </button>
      <div></div>
      <div className="posts-container">
        {data &&
          data.map((post) => (
            <Post
              {...post}
              key={post._id}
              onDelete={handlePostDelete}
              updateVotes={updateVotes}
            />
          ))}
      </div>

      {showCreateProduct && (
        <CreateProduct
          onCreatePost={handleCreatePost}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Home;
