const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.get("/", (req, res) => {
    res.json({ message: "few" });
});

module.exports = router;
