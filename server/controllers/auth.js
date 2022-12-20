const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");

// const async = require("async");
// const { hash } = require("bcrypt");
const user = require("../models/user");

exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;
        // validation
        if (!name || name.trim().length == 0) return res.status(400).send("Name is required");
        if (!password || password.length < 6) {
            return res.status(400).send("Password length should be atleast 6 characters");
        };
        let userExists = await User.findOne({ email }).exec();
        if (userExists) return res.status(400).send("Email is taken");

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Register user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();
        // console.log("Saved User", user);
        return res.json({ register: true });
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Error, try again", err.message);
    }
};

exports.login = async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        // validation
        if (!password || password.length < 6) {
            return res.status(400).send("Password length should be atleast 6 characters");
        }
        // check if our db has user with that email
        let userExists = await User.findOne({ email }).exec();
        if (!userExists) return res.status(400).send("No user found");

        // Hash Password
        const match = await comparePassword(password, userExists.password);
        if (match) {
            // create signed jwt
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            // return user and token to client, exclude hashed password
            userExists.password = undefined;
            // send token and cookie
            res.cookie("token", token, {
                httpOnly: true,
                // secure:true
            })
            // send user as json response
            // console.log("Saved User", user);
            return res.json(userExists);
        } else {
            return res.status(401).send("Wrong Password")
        }
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Error, Try Again.")
    }
};
