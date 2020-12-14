const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "로그인 해주세요" });
    }

    const accessToken = req.headers.authorization.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });

        req.user = user;
    } catch (e) {
        e.message === "jwt expired"
            ? res.status(401).json({ error: "엑세스 토큰 만료" })
            : res.status(500).json({ error: "Interval Server Error" });
    }
};
