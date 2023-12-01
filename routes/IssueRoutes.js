const express = require("express");
const router = express.Router();

const {
  newISsue,
  getIssue,
  updateIssue,
  deleteIssue,
  getUserIssues,
} = require("../controllers/Issue");

router.post("/newissue", newISsue);
router.post("/getissue", getIssue);
router.put("/updateissue", updateIssue);
router.delete("/deleteissue", deleteIssue);
router.post("/getuserissues", getUserIssues);

module.exports = router;
