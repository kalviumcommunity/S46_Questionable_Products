import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateProduct.css";

function CreateProduct({ onCreatePost, onClose }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://questionable-products.onrender.com/products", {
        title,
        image,
        description,
        category,
        votes: 0,
      });
      toast.success("Product created successfully");
      onCreatePost();
    } catch (error) {
      toast.warn("Please fill all the fields");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="modal">
          <div className="modal__header">
            <span className="modal__title">Add new Product</span>
            <span className="close__modal" onClick={onClose}>
              <b>X</b>
            </span>
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
            <button className="create" onClick={handleSubmit}>
              Create product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
