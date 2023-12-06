const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

const UserRoutes = require("./routes/UserRoutes");
const IssueRoutes = require("./routes/IssueRoutes");

app.use(morgan("dev"));

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const port = 3000;
const url = "mongodb+srv://abinav:hello123@cluster0.gxhackv.mongodb.net/";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({
    message:
      "this  is a private server made for our Activity point program in our college",
  });
});

app.get("/testing", (res, res) => {
  res.json([
    {
      pincode: "110001",
      Status: "pending",
      city: "Delhi",
      IssueType: "WaterStagmentation",
    },
    {
      pincode: "641045",
      Status: "resolved",
      city: "Coimbatore",
      IssueType: "Garbage",
    },
    {
      pincode: "641004",
      Status: "pending",
      city: "Coimbatore",
      IssueType: "Garbage",
    },
  ]);
});

app.use("/user", UserRoutes);
app.use("/issue", IssueRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
