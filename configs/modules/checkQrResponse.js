const { qrHistoryModel, scbResponse } = require("../routes/database");

const checkQrResponse = async (req, res, next) => {
  try {
    const ref = await scbResponse.findAll({
      attributes: ["billPaymentRef1"],
    });

    let mapRef = ref.map((id) => id.dataValues.billPaymentRef1);

    const result = await qrHistoryModel.findAll({
      where: {
        status: "Created",
        ref1: mapRef,
      },
    });
    if (result) {
      await qrHistoryModel.update(
        {
          status: "Paid",
        },
        {
          where: {
            status: "Created",
            ref1: mapRef,
          },
        }
      );
      qrHistoryModel.afterSave();
      return result;
    }
    next();
  } catch (err) {
    console.error("Error checking QR response:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readQrResponse = async (req, res) => {
  const reference = req.body;
  try {
    const ref = await qrHistoryModel.findAll({
      where: {
        status: "Paid",
        ref1: reference.ref1
      },
      attributes: ["ref1"]
    });

    let mapRef = ref.map((id) => id.dataValues.ref1);

    const result = await scbResponse.findOne({
      where: {
        billPaymentRef1: mapRef
      }
    });

    
    if(result) {
      return res.status(200).json(result);
    }
    else {
      return res.status(404).json({ message: "No QR response found" });
    }
  } catch (error) {
    res.status(400).json({message:"Error checking QR response:", error})
  }
};

exports.checkQrResponse = checkQrResponse;
exports.readQrResponse = readQrResponse;
