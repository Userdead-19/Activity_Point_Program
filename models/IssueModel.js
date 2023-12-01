const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    typeofissue: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    localtion: {
      type: String,
      required: true,
    },
    issuestatus: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", IssueSchema);
