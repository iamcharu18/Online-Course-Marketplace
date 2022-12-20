const User = require("../models/user");
const { hashPassword, conparePassword } = require("../utils/auth");

// const async = require("async");
const { hash } = require("bcrypt");

exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email, password } = req.body;
        // validation
        if (!name) return res.status(400).send("Name is required");
        if (!password || password.length < 6) {
            return res.status(400).send("Password length should be atleast 6 characters");
        }
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
        console.log("Saved User", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error, try again")
    }
};
