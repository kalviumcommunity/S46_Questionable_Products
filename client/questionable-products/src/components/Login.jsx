import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        {
          username: data.Username,
          password: data.password,
        }
      );
      toast.success("Login Successful");
      setCookie("username", data.Username, 365);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const setCookie = (name, value, daysToExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = ";expires=" + date.toUTCString();
    const secure = ";Secure";
    const sameSite = ";SameSite=None";

    document.cookie =
      name + "=" + value + expires + ";path=/" + secure + sameSite;
  };
  const words = [
    {
      text: "Hey! ",
    },
    {
      text: "Welcome",
      className: "dark:text-purple-600",
    },
    {
      text: "Back",
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

          <button className=" button login" type="submit">
            Login
          </button>
        </form>
        <p>
          New here?{" "}
          <Link to="/signup">
            <span className="button">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
