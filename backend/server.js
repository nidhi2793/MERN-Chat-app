const express = require("express");
const colors = require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const chats = require("./data/data");
const cors = require("cors");
const app = express();

//routes
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
//middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

app.use(cors());

app.use(express.json()); //to accept JSON data

app.get("/", (req, res) => {
  res.send("App running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

//middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("MongoDB Connected".cyan.bold);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`.blue.bold)
    );
  } catch (error) {
    console.log(error.red.bold);
  }
};

start();
