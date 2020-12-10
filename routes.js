const express = require("express");
const router = express.Router();
const { User } = require("./models");

// router.use("/auth", require("./auth"));
router.get("/", (req, res) => {
    res.json({ message: "success" });
});

router.post("/user/insert", async (req, res) => {
    const user = await User(req.body);
    res.json({ user });
});
module.exports = router;
