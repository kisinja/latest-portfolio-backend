require('dotenv').config();
const express = require('express');
const { connectdb } = require("./db");
const cors = require('cors');
const morgan = require('morgan');

const blogRouter = require("./routes/blogs");
const messageRouter = require("./routes/messages");

const app = express();
app.use(express.json());
app.use(morgan('common'));

app.use(cors({
    origins: ["http://localhost:5173", "https://myhub-s861.onrender.com", "http://localhost:5174"],
}));

const PORT = process.env.PORT || 3000;

const startServer = () => {
    try {
        connectdb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error while starting server: ", error.message);
    }
};

app.use("/api/blogs", blogRouter);
app.use("/api/messages", messageRouter);

startServer();

app.get("/", (req, res) => {
    res.send({ "message": "Hello World!" });
});


// Make the 'uploads' directory publicly accessible
app.use('/uploads', express.static('uploads'));