import React, { useState, useEffect } from "react";
import "./Navbar.css";
import searchIcon from "../assets/search-b.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
  }, []);

  function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result = null;
    cArray.forEach((element) => {
      if (element.indexOf(name) === 0) {
        result = element.substring(name.length + 1);
      }
    });
    return result;
  }
  function handleLogout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername("");
    navigate("/");
  }



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
        <div className="logged-in-user"><button className="button">{username}</button><button className="button" onClick={handleLogout}>Log out</button></div>
      ) : (
        <Link to="/signup">
          <button className="button">Sign up</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;

