const routesFile = require("./routes/routesFile")
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((res, req, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "../public")));

// routes
app.use("/api/routes", routesFile);


