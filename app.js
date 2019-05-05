require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const generateJWT = () => {
  return jwt.sign({}, process.env.GCP_PRIVATE_KEY, {
    algorithm: "RS256",
    audience: "https://www.googleapis.com/oauth2/v4/token",
    issuer: process.env.GCP_EMAIL,
    expiresIn: "1h"
  });
};

app.get("/jwt", (req, res) => {
  if (req.headers["rbx-auth"] !== process.env.ACCESS_KEY) {
    return res.sendStatus(403);
  } else {
    const token = generateJWT();

    return res.json({
      token: token
    });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}`)
);
