const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const Blog = require("./server/post");
const mongoose = require("mongoose");

console.log(process.env.MONGODB_URI);
mongoose.connect(
  "mongodb+srv://abhishekagr00008:Abhishek@cluster0.owotj8v.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/news/:id", async function (req, res) {
  try {
    const blog = await Blog.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const filePath = path.resolve(__dirname, "client", "build", "index.html");
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, blog.title);
      data = data.replace(/\$OG_DESCRIPTION/g, blog.subtitle);
      data = data.replace(/\$OG_DESCRIPTION/g, blog.subtitle);
      const result = data.replace(/\$OG_IMAGE/g, blog.imageUrl);
      res.send(result);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "client", "build", "index.html");
  response.sendFile(filePath);
});

app.listen(9000);
