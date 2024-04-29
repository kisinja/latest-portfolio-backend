const express = require('express');
const { connectdb } = require("./db");
const cors = require('cors');

const blogRouter = require("./routes/blogs");

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 5555;

const startServer = async () => {
    try {
        await connectdb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error while starting server: ", error.message);
    }
};

app.use("/api",blogRouter);

startServer();

app.get("/", (req, res) => {
    res.send({ "message": "Hello World!" });
});