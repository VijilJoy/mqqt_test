const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Data = require("./mongodb");
// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(require("./update"));
// Connect to MongoDB
const mongoURI =
  "mongodb+srv://loudaudiosin:DeUr7uxxM4WJATiP@loud.fvt8u.mongodb.net/firmware?retryWrites=true&w=majority&appName=LOUD"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connecte"))
  .catch((err) => console.log(err));

// Route to store data
app.post("/data", async (req, res) => {
  const { name, url, version } = req.body;

  const newData = new Data({
    name,
    url,
    version,
  });

  try {
    await newData.save();
    res.status(201).json({ message: "Data saved successfully", data: newData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
