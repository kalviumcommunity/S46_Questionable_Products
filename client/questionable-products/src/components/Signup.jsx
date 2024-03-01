import React, { useState } from "react";
import "./Signup.css";
import imgg from "../assets/24237566_6922095.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    if (data.password !== data.confirm) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + "/users", {
          username: data.Username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm,
        });
        toast.success("Signup Successful");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.log(err);
        toast.error("Signup Failed");
      }
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <div className="left">
        <img src={imgg} alt="" />
      </div>
      <div className="right">
        <h1 className="top">
          questionable <br></br>products
        </h1>
        <div>
          <h2>Explore mind-boggling products</h2>
          <form onSubmit={handleSubmit(handleSignup)}>
            <input
              className="username"
              placeholder="Username"
              type="text"
              {...register("Username", {
                required: "Username is required!",
                minLength: {
                  value: 3,
                  message: "Username should be more than 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Username should be less than 30 characters",
                },
              })}
            />
            {errors.Username && <p>{errors.Username.message}</p>}

            <input
              className="username"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
              className="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                pattern: {
                  value: /.*[\W]+.*/i,
                  message:
                    "Password must contain at least one special character",
                },
                minLength: {
                  value: 5,
                  message: "Password must have at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password must have at most 20 characters",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              className="password"
              type="password"
              placeholder="Confirm Password"
              {...register("confirm", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
            />
            {errors.confirm && <p>{errors.confirm.message}</p>}

            <button className="signup" type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
