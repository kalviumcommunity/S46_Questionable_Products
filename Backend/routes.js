const express = require('express');
const router = express.Router();
const { User, Product } = require('./schema');



// creating a user and product (C)

router.post('/users', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/products', async (req, res) => {
    const product = new Product({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        category: req.body.category,
        votes: req.body.votes,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





// getting a user and product (R)

router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get users & products by ID
router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    User
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  });


router.get("/products/:id", (req, res) => {
    const id = req.params.id;
    Product
      .findById(id)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  });




// Updating a user and product (U)

router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            user.password = req.body.password;
        
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/products/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByIdAndUpdate({_id: id}, {
            image: req.body.image || undefined,
            title: req.body.title || undefined,
            description: req.body.description || undefined,
            category: req.body.category || undefined,
            votes: req.body.votes || undefined,
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});




// deleting a user and product (D)

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser == null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
