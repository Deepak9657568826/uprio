const express = require("express");
const cors = require("cors");
const { taskRouter } = require("./routes/taskRoutes");
const { connection } = require("./config/db");
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());




// for checking the routes
app.get("/", (req, res) => {
    res.status(200).json({ "msg": "This is home page" });
})

app.use("/task", taskRouter)

const PORT = process.env.PORT || 4500

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to database");
        console.log(`Server running on port  ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})

