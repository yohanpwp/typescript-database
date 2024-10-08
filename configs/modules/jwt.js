const jwt = require("jsonwebtoken");
const { userModel } = require("../routes/database");

const SECRET = "mysecret";

const signToken = async (req, res) => {
  const payload = {
    sub: req.body.username.toLowerCase(),
    iat: new Date().getTime(),
  };
  let token = jwt.sign(payload, SECRET, { expiresIn: "20m" });
  return token;
};

const generatedToken = (req, data) => {
  const payload = {
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
  };
  const rememberMe = req.body.rememberMe;
  let token = "";
  if (rememberMe !== true) {
    token = jwt.sign(payload, SECRET, { expiresIn: "20m" });
  } else {
    token = jwt.sign(payload, SECRET, { expiresIn: "7d" });
  }
  return token;
};

const verifyToken = async (req, res) => {
  if (!req?.headers["authorization"]) {
    return false;
  }
  const token = req?.headers["authorization"].split(" ")[1];
  let user = jwt.verify(token, SECRET);
  if (user) {
    //มั่นใจว่า user ที่เข้ามานั้นถูกต้องแล้ว โดยรีเช็คจาก Database
    const result = await userModel.findOne({
      where: { username: user.username },
      attributes: ['id','username','firstName','lastName'],
    });
    if (!result) {
      return false;
    }
    return result.dataValues;
  } else {
    return false;
  }
};

exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.generatedToken = generatedToken;
