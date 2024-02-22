import React from "react";
import "./Navbar.css";
import searchIcon from "../assets/search-b.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <strong>
        <p>
          questionable <br /> products
        </p>
      </strong>

      <div className="search-box">
        <input className="input" type="text" placeholder="Search" />
        <img src={searchIcon} alt="" />
      </div>

      <Link to="/signup">
        <button className="signUp">Sign up</button>
      </Link>
    </div>
  );
}

export default Navbar;
