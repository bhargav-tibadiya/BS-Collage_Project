const express = require("express");
const { content } = require("../controllers/contect-controller.js");
const router = express.Router();

router.route("/content").post(content);


module.exports = router;
