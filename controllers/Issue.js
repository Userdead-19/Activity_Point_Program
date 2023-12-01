const IssueSchema = require("../models/IssueModel");
const USerschema = require("../models/UserModel");

const newISsue = async (req, res) => {
  try {
    const { userid } = req.body;
    const User = await USerschema.findById(userid);
    IssueSchema.create(req.body).then((data) => {
      User.issues.push(data._id);
      User.save();
      res.status(200).json({ message: "Issue created successfully", data });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIssue = async (req, res) => {
  const { issueId } = req.body;
  try {
    const issue = await IssueSchema.findById(issueId);
    res.status(200).json({ message: "Issue fetched successfully", issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserIssues = async (req, res) => {
  try {
    const { userid } = req.body;
    const Issues = await IssueSchema.find({ userid: userid });
    res.status(200).json({ message: "Issues fetched successfully", Issues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIssue = async (req, res) => {
  try {
    const { issueId } = req.body;
    const Issue = await IssueSchema.findByIdAndUpdate(issueId, req.body);
    Issue.save();
    res.status(200).json({ message: "Issue updated successfully", Issue });
  } catch (error) {}
};

const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.body;
    const Issue = await IssueSchema.findByIdAndDelete(issueId);
    res.status(200).json({ message: "Issue deleted successfully", Issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  newISsue,
  getIssue,
  updateIssue,
  deleteIssue,
  getUserIssues,
};
