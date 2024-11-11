const express = require("express");
const cors = require('cors');
const { taskRouter } = require("./routes/task.routes");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
require('dotenv').config()
const app = express();

app.use(express.json());

app.use(cors());

// for checking the routes
app.get("/", (req, res) => {
    res.status(200).json({ "msg": "This is home page" });
})

app.use("/task", taskRouter)
app.use("/auth" , userRouter)


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

