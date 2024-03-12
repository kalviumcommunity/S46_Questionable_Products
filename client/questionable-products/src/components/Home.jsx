import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Navbar from "./Navbar";
import Post from "./Post";
import CreateProduct from "./CreateProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../components/helpers/Cookies.js";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateProduct, setshowCreateProduct] = useState(false);
  const jwtToken = getCookie("jwtToken");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false)
      })
  }, [])

  const handleCreatePostClick = () => {
    setshowCreateProduct(true);
  };

  const handleCreatePost = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setshowCreateProduct(false);
  };

  const handleCloseModal = () => {
    setshowCreateProduct(false);
  };

  const handlePostDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/products/" + id, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        toast.error("Post Deleted Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
