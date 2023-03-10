const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");

require("dotenv").config();

// creating express app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => console.log("DB Error : ", err));
// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});