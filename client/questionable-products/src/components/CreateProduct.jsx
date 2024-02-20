import React, { useState } from 'react';
import axios from 'axios';
import './CreateProduct.css';

function CreateProduct({ onCreatePost, onClose }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://questionable-products.onrender.com/products", {
        title,
        image,
        description,
        category,
      });
      console.log(response.data);
      onCreatePost(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

  <div class="container">
	
	<div class="modal">
		<div class="modal__header">
			<span class="modal__title">Add new Product</span>
      <span className='close__modal' onClick={onClose}><b>X</b></span>
		</div>


		<div class="modal__body">

			<div class="input">
				<label class="input__label">Product title</label>
				<input class="input__field" type="text" 
        value={title}
        onChange={(e)=> setTitle(e.target.value)}/>
				<p class="input__description">The title must contain a maximum of 32 characters</p>
			</div>


      <div class="input">
				<label class="input__label">Image Link</label>
				<input class="input__field" type="text" 
        value={image}
        onChange={(e)=> setImage(e.target.value)}/>
				<p class="input__description">Please "copy image link" and paste it here</p>
			</div>


      <div class="input">
				<label class="input__label">Category</label>
				<input class="input__field" type="text" 
        value={category}
        onChange={(e)=> setCategory(e.target.value)}/>
				<p class="input__description">Mention the category of the product e.g Utility</p>
			</div>


			<div class="input">
				<label class="input__label">Description</label>
				<textarea class="input__field input__field--textarea"
        value={description}
        onChange={(e)=> setDescription(e.target.value)}>
        </textarea>
				<p class="input__description">Give your product a good description so everyone know what so wierd about it</p>
			</div>
		</div>

		<div class="modal__footer">
			<button class="create" onClick={handleSubmit}>Create project</button>
		</div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
