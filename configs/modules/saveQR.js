const { qrHistoryModel} = require("../routes/database");
const { checkQrResponse } = require("./checkQrResponse");

// ฟังก์ชั่นสำหรับบันทึก QR code ที่สแกน

const postQrHistory = async (req, res) => {
  const data = req.body;
  console.log(data);
  if (!data.username && !data.qrCode && !data.amounts) return res.status(200).json({ message: 'Please check your input values' });

  try {
    const qrHistory = await qrHistoryModel.create({
      qrType: data.body.qrBody.qrType,
      ppType : data.body.qrBody.ppType,
      ppId : data.body.qrBody.ppId,
      createdBy: data.username,
      qrCode: data.body.image,
      amounts: data.amounts,
      ref1: data.body.qrBody.ref1,
      ref2: data.body.qrBody.ref2,
      ref3: data.body.qrBody.ref3,
      token: data.token,
      customer: data.customerName,
      remark: data.remark,
      status: 'Created',
    });
    res.status(201).json({qrHistory,message: 'Your data is saved successfully'});
  } catch (error) {
    console.error('Error creating QR history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getQrHistory = async (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(404).json({ message: 'Page not found' });
  try {
    const qrHistory = await qrHistoryModel.findAll({
      where: { createdBy: username.toLowerCase() },
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['updatedAt'] },
    });
    if(qrHistory==false) { return res.status(404).json({ message: 'User not found' });}
    else {
      await checkQrResponse()
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