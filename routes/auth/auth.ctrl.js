const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
    try {
        const { email, pw } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user)
            return res
                .status(400)
                .json({ error: "일치하는 이메일이 없습니다." });

        const passwordCheck = await bcrypt.compare(pw, user.pw);

        if (!passwordCheck)
            return res
                .status(400)
                .json({ error: "비밀번호가 일치하지 않습니다." });

        const accessToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );
        res.status(200).json({ accessToken, refreshToken });
    } catch (e) {
        res.status(500).json({
            error: "500 서버에러",
        });
    }
};

exports.signUp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({
            where: { email },
        });

        if (user)
            return res
                .status(400)
                .json({ error: "이미 존재하는 이메일이 있습니다." });

        const newUser = await User.create(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.pw = await bcrypt.hash(newUser.pw, salt);

        await newUser.save();

        res.status(200).json({ message: "success" });
    } catch (e) {
        res.status(500).json({
            error: e,
        });
    }
};

exports.token = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                email: decoded.email,
            },
        });

        const newAccessToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const newRefreshToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        );
        user
            ? res.status(200).json({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
              })
            : res.status(500).json({ error: "다시 로그인해주세요" });
    } catch (e) {
        e.message === "jwt expired"
            ? res.status(500).json({ error: "다시 로그인해주세요" })
            : res.status(500).json({ error: "Interval Server Error" });
    }
};
