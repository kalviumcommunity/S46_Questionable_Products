import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Post from "./Post";
import axios from "axios";
import CreateProduct from "./CreateProduct";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateProduct, setshowCreateProduct] = useState(false);

  useEffect(() => {
    axios
      .get("https://questionable-products.onrender.com/products")
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  const handleCreatePostClick = () => {
    setshowCreateProduct(true);
  };

  const handleCreatePost = () => {
    axios
      .get("https://questionable-products.onrender.com/products")
      .then((data) => {
        setData(data.data);
      });
    setshowCreateProduct(false);
  };

  const handleCloseModal = () => {
    setshowCreateProduct(false);
  };
  if (isLoading) {
    return (
      <div className="flexx">
        <svg viewBox="25 25 50 50">
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

      <div className="posts-container">
        {data && data.map((post) => <Post {...post} key={post._id} />)}
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
