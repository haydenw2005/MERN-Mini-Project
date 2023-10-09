//https://www.youtube.com/watch?v=7CqJlxBYj-M&ab_channel=freeCodeCamp.org
//Credits to freeCodeCamp.org for MERN tutorial
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
}

app.use(cors(corsOptions));
app.use(express.json());

app.post("/search", async (req, res) => {
  const url = "https://api.apollo.io/v1/mixed_people/search";

  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  };

  try {
    req.body["api_key"] = process.env.API_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
