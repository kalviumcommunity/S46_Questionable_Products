import React, { useEffect } from "react";
import "./UpdateProduct.css";
import { useState } from "react";
import "./CreateProduct.css";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";


function UpdateProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const history = useNavigate(); 


  useEffect(() => {
    axios
      .get(`https://questionable-products.onrender.com/products/${id}`)
      .then((data) => {
        console.log(data.data);
        setTitle(data.data.title);
        setImage(data.data.image);
        setDescription(data.data.description);
        setCategory(data.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios.put("https://questionable-products.onrender.com/products/" + id, {
      title,
      image,
      description,
      category,
    }).then(() => {
      console.log(title, image, description, category);
      history("/"); 
    }).catch((err) => {
      console.error("Error updating product:", err);
    });
   
  };

  return (
    <div>
      <div class="container">
        <div class="modal">
          <div class="modal__header">
            <span class="modal__title">Update Product</span>
          </div>

          <div class="modal__body">
            <div class="input">
              <label class="input__label">Product title</label>
              <input
                class="input__field"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p class="input__description">
                The title must contain a maximum of 32 characters
              </p>
            </div>

            <div class="input">
              <label class="input__label">Image Link</label>
              <input
                class="input__field"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <p class="input__description">
                Please "copy image link" and paste it here
              </p>
            </div>

            <div class="input">
              <label class="input__label">Category</label>
              <input
                class="input__field"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <p class="input__description">
                Mention the category of the product e.g Utility
              </p>
            </div>

            <div class="input">
              <label class="input__label">Description</label>
              <textarea
                class="input__field input__field--textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <p class="input__description">
                Give your product a good description so everyone know what so
                wierd about it
              </p>
            </div>
          </div>

          <div class="modal__footer">
              <button class="create" onClick={handleUpdate}>
                Update product
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
