
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require("cors");
const { mongoURL } = require('./key');

app.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
}));

app.use(express.json())

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", require("./routes/Costmoer"));

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
});


app.listen(port, () => {
    console.log("Server is running on", port);
});
