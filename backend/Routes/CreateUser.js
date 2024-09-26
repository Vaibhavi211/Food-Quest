const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secretToken = "MyNameisAnkitKumar"
//here we create post route to , send user data to mongodb

router.post("/createuser", [
    body('email', "Invalid email").isEmail(),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = new User({
            name: req.body.name,
            password: securePassword,
            location: req.body.location,
            email: req.body.email
        });

        await user.save();

        res.json({ success: true });
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



//here we create post route to , send user data to mongodb

router.post("/loginuser", [
    body('email', "Invalid email").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let useredata = await User.findOne({ email })   //data get from database
        if (!useredata) {
            return res.status(400).json({ errors: "Enter correct email or password" });
        }
        let pwdCompare = await bcrypt.compare(req.body.password, useredata.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Enter correct email or password" });
        } else {
            // alert("Logged in successfully");
            const data = {
                user: {
                    id: useredata.id
                }
            }
            const authToken = jwt.sign(data, secretToken);
            return res.json({ success: true, authToken: authToken })
        }
        // }
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.json({ success: false })
    }
});

module.exports = router;
