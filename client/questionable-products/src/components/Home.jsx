import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Post from "./Post";
import CreateProduct from "./CreateProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./helpers/axiosConfig.js";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showCreateProduct, setshowCreateProduct] = useState(false);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("All Users");

  useEffect(() => {
    axiosInstance
      .get(import.meta.env.VITE_API_URL + "/products")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(import.meta.env.VITE_API_URL + "/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const handleCreatePostClick = () => {
    setshowCreateProduct(true);
  };

  const handleCreatePost = () => {
    axiosInstance
      .get(import.meta.env.VITE_API_URL + "/products")
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setshowCreateProduct(false);
  };

  const handleCloseModal = () => {
    setshowCreateProduct(false);
  };
  const updateVotes = () => {
    toast.success("Vote Updated Successfully", {
      position: "bottom-center",
      autoClose: 900,
      hideProgressBar: true,
    });
  };

  const handeSelection = (e) => {
    setSelected(e.target.value);
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

  const Posts = data.filter((posts) => {
    if (selected === "All Users") {
      return posts;
    } else {
      return posts.postedBy === selected;
    }
  });

  return (
    <div>
      <Navbar />
      <select
        name="users"
        className="select-container"
        onChange={handeSelection}
      >
        <option value="All Users">All Users</option>
        {users &&
          users.map((user) => (
            <option value={user.username} className="options" key={user._id}>
              {user.username}
            </option>
          ))}
      </select>

      <button className="posts" onClick={handleCreatePostClick}>
        Create Post
      </button>

      <div className="posts-container">
        {Posts &&
          Posts.map((post) => (
            <Post {...post} key={post._id} updateVotes={updateVotes} />
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
