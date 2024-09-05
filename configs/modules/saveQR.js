const {qrHistoryModel} = require("../routes/database");
const { userModel } = require("../routes/database");

// ฟังก์ชั่นสำหรับบันทึก QR code ที่สแกน

const postQrHistory = async (req, res) => {
  const data = req.body;
  if (!data.username && !data.qrCode && !data.amounts) return res.status(200).json({ message: 'Please check your input values' });

  try {
    const qrHistory = await qrHistoryModel.create({
      createdBy: data.username,
      qrCode: data.qrCode,
      amounts: data.amounts,
    });
    res.status(201).json({qrHistory,message: 'Your data is saved successfully'});
  } catch (error) {
    console.error('Error creating QR history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getQrHistory = async (req, res) => {
  const username = req.body.username;
  // if (!username) return res.status(404).json({ message: 'Page not found' });
  try {
    const qrHistory = await qrHistoryModel.findAll({
      where: { createdBy: username },
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['createdBy', 'updatedAt'] },
    });
    if(qrHistory==false) { return res.status(404).json({ message: 'User not found' });}
    else {
      res.status(200).json(qrHistory);
      return qrHistory;
    }
}
catch (error) {
  console.error('Error retrieving QR history:', error);
  res.status(500).json(error.message);
}
};

exports.postQrHistory = postQrHistory;
exports.getQrHistory = getQrHistory;