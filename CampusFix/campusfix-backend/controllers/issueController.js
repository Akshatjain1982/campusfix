import Issue from "../models/Issue.js";

// ✅ CREATE ISSUE (attach logged-in user)
export const createIssue = async (req, res) => {
  try {
    const issue = await Issue.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      category: req.body.category,
      imageUrl: req.body.imageUrl || "",
      status: "Pending",

      // 🔥 THIS LINE FIXES EVERYTHING
      createdBy: req.user.id,
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Issue creation failed" });
  }
};

// ✅ GET ISSUES (ALL or ONLY MINE)
export const getAllIssues = async (req, res) => {
  try {
    const filter = {};

    // 🔥 If user wants ONLY HIS issues
    if (req.query.mine === "true") {
      filter.createdBy = req.user.id;
    }

    const issues = await Issue.find(filter).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

// ✅ UPDATE STATUS
export const updateIssueStatus = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};
