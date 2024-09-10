const mongoose = require("mongoose");
const connection_url = process.env.MONGO_URI;
const connectdb = () => {
    mongoose.connect(connection_url).then(() => console.log("Database connected successfully!!"))
}

module.exports.connectdb = connectdb;