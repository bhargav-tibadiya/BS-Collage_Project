const Contect = require("../models/contect-model.js");

const content = async (req, res) => {
  try {
    const response = req.body;
    await Contect.create(response);
    return res.status(200).json({ message: "success message" });
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { content };
