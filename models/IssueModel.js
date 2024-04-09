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
    location: {
      type: String,
      required: true,
    },
    issuestatus: {
      type: String,
      default: "Pending",
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", IssueSchema);
