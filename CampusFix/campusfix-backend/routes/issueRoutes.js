const express = require("express");
const { createIssue, getIssues, getIssueById, updateStatus } = require("../controllers/issueController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/", getIssues);
router.get("/:id", getIssueById);
router.put("/:id/status", auth, updateStatus);

module.exports = router;
