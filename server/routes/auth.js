const express = require("express");
const router = express.Router();

const { register } = require("../controllers/auth");

// router.get("/", (req, res) => {
//     res.send("you hit server endpoint");
// });

router.post("/register", register)

module.exports = router;