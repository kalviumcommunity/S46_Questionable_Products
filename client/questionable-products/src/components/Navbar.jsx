import React, { useState, useEffect } from "react";
import "./Navbar.css";
import searchIcon from "../assets/search-b.png";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "./helpers/Cookies";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  const handleLogout = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/logout", {}, { withCredentials: true })
      .then((response) => {
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
        setUsername("");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Logout failed");
      });
  };


  return (
    <div className="navbar">
      <strong>
        <p>
          questionable <br /> products
        </p>
      </strong>

      <div className="search-box">
        <input className="input" type="text" placeholder="Search" />
        <img className="search-icon" src={searchIcon} alt="search" />
      </div>

      {username ? (
        <div className="logged-in-user">
          <Link to="/profile">
            <button className="button">{username}</button>
          </Link>
          <button className="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <Link to="/signup">
          <button className="button">Sign up</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
