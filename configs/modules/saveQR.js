const { qrHistoryModel,scbResponse} = require("../routes/database");
const { checkQrResponse } = require("./checkQrResponse");
const { verifyToken } = require("../modules/jwt");

// ฟังก์ชั่นสำหรับบันทึก QR code ที่สแกน

const postQrHistory = async (req, res) => {
  const data = req.body;
  const userData = await verifyToken(req);
  if (!userData) return res.status(401).json({ message: "Unauthorized" });
  if (!data.qrCode && !data.amounts) return res.status(200).json({ message: 'Please check your input values' });
  else {
    try {
      const qrHistory = await qrHistoryModel.create({
        qrType: data.body.qrBody.qrType,
        ppType : data.body.qrBody.ppType,
        ppId : data.body.qrBody.ppId,
        createdBy: userData.username,  // ใข้ username  from token
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
      return qrHistory;  
    } catch (error) {
      console.error('Error creating QR history:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
};

const getQrHistory = async (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(404).json({ message: 'Page not found' });
  try {
    // Assuming that qrHistoryModel has a foreign key to scbResponseModel
    qrHistoryModel.belongsTo(scbResponse,{targetKey:'billPaymentRef1',foreignKey: 'ref1'});
    
    const qrHistory = await qrHistoryModel.findAll({
      where: { createdBy: username.toLowerCase() },
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['updatedAt'] },
      include: [
        {model: scbResponse,
        }
      ]
    });
    if(qrHistory==false) { 
      res.status(200).json({ message: 'User not found' , qrHistory });
    } else {
      if (typeof checkQrResponse === 'function') {
        await checkQrResponse();
      }
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