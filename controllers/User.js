const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const CreateNewUser = async (req, res) => {
  const { username, email, password, name } = req.body;
  const user = new UserModel({
    username,
    email,
    password,
    name,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const LoginUser = async (req, res) => {
  const { username, password } = req.body;
  UserModel.find({ username: username }).then((result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else {
      if (!user) {
        res.status(401).json({ message: "User not found" });
      } else {
        if (user[0].password !== password) {
          res.status(401).json({ message: "Incorrect password" });
        } else {
          const token = jwt.sign({ userID: user[0]._id }, "SANITATION");
          const auth = {
            Bearer: "User",
          };
          res
            .status(200)
            .json(
              { token: token },
              { message: "Login successful" },
              { Authentication: auth }
            );
        }
      }
    }
  });
};

const GetUser = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findById({ _id: userID });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { userID } = req.body;
    UserModel.findByIdAndUpdate(userID, req.body, { new: true })
      .then((result) => {
        res.status(200).json({ message: "User updated successfully", result });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CreateNewUser,
  LoginUser,
  GetUser,
  UpdateUser,
};
