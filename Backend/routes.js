const express = require("express");
const router = express.Router();
const { User, Product } = require("./schema");
const { userJoiSchema, productJoiSchema } = require("./joiSchema");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// creating a user and product (C)
router.post("/users", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 17);


      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });

      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" })
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" })
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" })
    }

    const responseData = {
      userId: user._id,
      username: user.username
    };

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
});



router.post("/products", async (req, res) => {
  try {
    const { error } = productJoiSchema.validate(req.body);
    if (error) throw error;

    const product = new Product({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      votes: req.body.votes,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// getting all users and products (R)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get user & product by ID
router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ message: "User not found" }));
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ message: "Product not found" }));
});

// Updating a user and product (U)
router.patch("/users/:id", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) throw error;

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { error } = productJoiSchema.validate(req.body);
    if (error) throw error;

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting a user and product (D)
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
