const express = require("express");
const router = express.Router();

const {
  newISsue,
  getIssues,
  updateIssue,
  deleteIssue,
} = require("../controllers/Issue");

router.post("/newissue", newISsue);
router.get("/getissue", getIssues);
router.put("/updateissue", updateIssue);
router.delete("/deleteissue", deleteIssue);

module.exports = router;
