const path = require("path");
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const CONSTANTS = require("./constants");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(function(req, res, next) {
  const allowedOrigins = [
    "http://127.0.0.1:7999",
    "http://localhost:7999",
    "juliomaldonado.com",
    "yeux.tech"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json; charset=utf-8");

  return next();
});

app.post("/api/send_email", (req, res) => {
  console.log("STARTING API/SEND_EMAIL ACTION");
  if ("emailAddress" in req.body) {
    const emailAddress = req.body.emailAddress;
    const name = req.body.name;
    const subject = req.body.subject;
    const message = req.body.message;

    CONSTANTS.yeux_request(name, emailAddress, subject, message)
      .then(() => {
        console.log("email sent to", emailAddress);
      })
      .then(
        CONSTANTS.yeux_request_to_client(
          "Yeux",
          "julio.maldonado.guzman@gmail.com",
          "Yeux Email confirmation",
          "Your email has been received by Yeux. We will respond promptly. Have a great day!"
        )
      )
      .then(result => {
        console.log(result);
        res.send({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.send({ succes: false, statusCode: err.statusCode });
      });
  } else {
    const email = req.body.email;
    CONSTANTS.request("juliom72@tamu.edu", email, "New user Sign Up")
      .then(() => {
        console.log("email sent to juliom72@tamu.edu");
      })
      .then(
        CONSTANTS.request(
          email,
          CONSTANTS.DEFAULT_MESSAGE,
          CONSTANTS.DEFAULT_SUBJECT
        )
      )
      .then(result => {
        console.log(result);
        res.send({ success: true, result });
      })
      .catch(err => {
        console.log(err);
        res.send({ succes: false, statusCode: err.statusCode });
      });
  }
});

app.get("/", (req, res) => res.render("pages/index"));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
