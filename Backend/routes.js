require("dotenv").config();
const express = require("express");
const router = express.Router();
const { User, Product } = require("./schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userJoiSchema, productJoiSchema } = require("./joiSchema");
const cookieParser = require("cookie-parser");

router.use(express.json());
router.use(cookieParser());

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized: No token provided" });
  }
  const authToken = token.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
};

// creating a user and product (C)
router.post("/users", async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const usernameExists = await User.findOne({
        username: req.body.username,
      });
      if (usernameExists) {
        return res.status(409).json({ message: "Username already exists" });
      }
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      const newUser = await user.save();
      const accessToken = createAccessToken({
        userId: user._id,
        username: user.username,
      });

      const refreshToken = createRefreshToken({
        userId: user._id,
        username: user.username,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({ accessToken });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = createAccessToken({
      userId: user._id,
      username: user.username,
    });

    const refreshToken = createRefreshToken({
      userId: user._id,
      username: user.username,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = createAccessToken({
      userId: decoded.userId,
      username: decoded.username,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Forbidden: Invalid refresh token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("username");
  res.status(200).json({ message: "Logged out" });
});

router.post("/products", authenticate, async (req, res) => {
  try {
    const { error } = productJoiSchema.validate(req.body);
    if (error) throw error;

    const product = new Product({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      category: req.body.category,
      votes: req.body.votes,
      postedBy: req.body.postedBy,
      createdAt: req.body.createdAt,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// getting all users and products (R)
router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/products", authenticate, async (req, res) => {
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

router.get("/products/:id", authenticate, (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.status(404).json({ message: "Product not found" }));
});

// Updating a user and product (U)
router.patch("/users/:id", authenticate, async (req, res) => {
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

router.put("/products/:id", authenticate, async (req, res) => {
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
router.delete("/users/:id", authenticate, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/products/:id", authenticate, async (req, res) => {
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
