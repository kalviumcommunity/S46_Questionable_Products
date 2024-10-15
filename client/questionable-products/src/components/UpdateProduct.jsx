import React, { useEffect } from "react";
import "./UpdateProduct.css";
import { useState } from "react";
import "./CreateProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "./helpers/axiosConfig.js";
import { getCookie } from "../components/helpers/Cookies.js";

function UpdateProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const postedBy = getCookie("username");

  const history = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(import.meta.env.VITE_API_URL + "/products/" + id)
      .then((data) => {
        setTitle(data.data.title);
        setImage(data.data.image);
        setDescription(data.data.description);
        setCategory(data.data.category);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axiosInstance
      .put(import.meta.env.VITE_API_URL + "/products/" + id, {
        title,
        image,
        description,
        category,
        postedBy,
      })
      .then(() => {
        toast.success("Post updated successfully");
        setTimeout(() => {
          history("/home");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="modal">
          <div className="modal__header">
            <span className="modal__title">Update Product</span>
          </div>

          <div className="modal__body">
            <div className="input">
              <label className="input__label">Product title</label>
              <input
                className="input__field"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="input__description">
                The title must contain a maximum of 32 characters
              </p>
            </div>

            <div className="input">
              <label className="input__label">Image Link</label>
              <input
                className="input__field"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <p className="input__description">
                Please "copy image link" and paste it here
              </p>
            </div>

            <div className="input">
              <label className="input__label">Category</label>
              <input
                className="input__field"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <p className="input__description">
                Mention the category of the product e.g Utility
              </p>
            </div>

            <div className="input">
              <label className="input__label">Description</label>
              <textarea
                className="input__field input__field--textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <p className="input__description">
                Give your product a good description so everyone know what so
                wierd about it
              </p>
            </div>
          </div>

          <div className="modal__footer">
            <button className="button create" onClick={handleUpdate}>
              Update product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
