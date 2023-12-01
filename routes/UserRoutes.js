const express = require("express");
const router = express.Router();
const {
  CreateNewUser,
  LoginUser,
  GetUser,
  UpdateUser,
} = require("../controllers/User");

const Usermodel = require("../models/UserModel");

router.post("/register", CreateNewUser);
router.post("/login", LoginUser);
router.get("/getuser", GetUser);
router.put("/updateuser", UpdateUser);

module.exports = router;
