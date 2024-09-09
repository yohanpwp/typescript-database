const jwt = require("jsonwebtoken");
const { userModel } = require("../routes/database");

const SECRET = "mysecret";

const signToken = async (req, res, next) => {
    const payload = {
        sub: req.body.username.toLowerCase(),
        iat: new Date().getTime(),
      };
    const token = jwt.sign(payload, SECRET, { expiresIn: "20m" });
    return token;
    next();
};

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    const user = jwt.verify(token, SECRET);
    //มั่นใจว่า user ที่เข้ามานั้นถูกต้องแล้ว โดยรีเช็คจาก Database
    const result = await userModel.findOne({
        where: { username: user.sub },
        attributes: { exclude: ["deletedAt", "deletedBy"] },
      });
      if (!result) {
        throw { message: "Invalid token" };
      }
    return user
};

exports.signToken = signToken;
exports.verifyToken = verifyToken;