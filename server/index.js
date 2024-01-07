const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");

app.get("/", function (request, response) {
  console.log("Home page visited!");
  const filePath = path.resolve(__dirname, "./build", "index.html");

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "Home Page");
    data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
    const result = data.replace(
      /\$OG_IMAGE/g,
      "https://i.imgur.com/V7irMl8.png"
    );
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
