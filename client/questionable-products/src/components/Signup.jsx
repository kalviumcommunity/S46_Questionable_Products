"use client";
import axios from "axios";
import { setCookie } from "./helpers/Cookies.js";
import React from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

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
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/users",
          {
            username: data.Username,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirm,
          },
          {
            withCredentials: true,
          }
        );

        const { accessToken } = response.data;
        toast.success("Signup Successful");
        localStorage.setItem("accessToken", accessToken);
        setCookie("username", data.Username, 365);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Signup failed");
      }
    }
  };

  const words = [
    {
      text: "Welcome to",
    },
    {
      text: "Questionable",
      className: "dark:text-purple-600",
    },
    {
      text: "Products.",
      className: "dark:text-purple-600",
    },
  ];

  return (
    <div className="wrapper">
      <h1 className="top">
        <TypewriterEffectSmooth words={words} />
      </h1>
      <div>
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
                message: "Password must contain at least one special character",
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

          <button className="button signup" type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="button">Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
