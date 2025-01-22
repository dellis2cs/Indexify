const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const cardRouter = require("./routes/card");
const mlRouter = require("./routes/ml");

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(cardRouter);
app.use(mlRouter);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
  console.log("test works");
});

mongoose
  .connect(
    "mongodb+srv://admin:VgQBQN1r0jRpaghh@indexifydb.b2jyw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=IndexifyDB"
  )
  .then(() => {
    port = process.env.PORT;
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });
