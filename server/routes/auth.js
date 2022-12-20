const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth");

// router.get("/", (req, res) => {
//     res.send("you hit server endpoint");
// });

router.post("/register", register)
router.post("/login", login)

module.exports = router;