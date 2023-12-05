const axios = require("axios");

const user = {
  username: "testuser",
  password: "test@123",
};

axios
  .post("https://greenguard.onrender.com/user/login", user)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
