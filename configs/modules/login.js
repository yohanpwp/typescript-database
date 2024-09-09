const bcrypt = require("bcrypt");

const { userModel } = require("../routes/database");
const { signToken } = require("./jwt");

const postLogin = async (req, res) => {
  const reqUser = req.body;
  const token = await signToken(req);

  if (!reqUser) {
    res.status(200).json({ message: "Please check your input values" });
  }
  try {
    const checkUser = await userModel.findOne({
      where: { username: reqUser.username.toLowerCase(), isActive: true },
    });
    if (checkUser) {
      bcrypt.compare(reqUser.password, checkUser.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return;
        }
        if (result) {
          res.status(200).json({
            message: "User logged in successfully",
            token: token,
          });
        } else {
          res.status(401).json({ message: "Invalid username or password" });
        }
      });
    } else if (!checkUser) {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        message: "Bad Request",
        errors: err.message,
      });
    } else {
      console.error("An unknown error occurred");
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

exports.postLogin = postLogin;
