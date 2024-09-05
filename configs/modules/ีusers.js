const { userModel } = require("../routes/database");

// ขอข้้อมูลผู้ใช้ในฐานข้อมูล
const postUserData = async (req, res) => {
  const name = req.body.username
  if (!name) return res.status(402);
  try {
    const checkUser = await userModel.findOne({
      where: { username: name, isActive: true },
    });
    if (!checkUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
        return res.status(200).json({
          user: {
            id: checkUser.id,
            username: checkUser.username,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
          },
          message: "User data successfully retrieved",
        });
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

exports.postUserData = postUserData;
