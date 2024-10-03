const { userModel, sequelize, qrHistoryModel } = require("../routes/database");
const { verifyToken } = require("../modules/jwt");

const editQrHistoryById = async (req, res) => { 
    try {
        const { id, customerName, status, remark } = req.body;
        const userData = await verifyToken(req);
        if (!userData) return res.status(401).json({ message: "Unauthorized" });
        const results = await qrHistoryModel.update({
            id: id,
            customer: customerName,
            status: status,
            remark: remark,
            updatedBy: userData.username
        },
        {
          where: { 
            id: id,
            createdBy: userData.username
         },
        })
        if (results) { 
            console.log(userData.username);
            res.status(201).json(results);}
        else res.status(200).json({ message: "QR Not Found" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteQrHistoryById = async (req, res) => { 
    try {
        const {id} = req.body;
        const userData = await verifyToken(req);
        if (!userData) return res.status(401).json({ message: "Unauthorized" });
        const results = await qrHistoryModel.update({
            deletedAt: Date.now() ,
            deletedBy: userData.username
        },{
            where: {
                id: id,
                createdBy: userData.username
            }
        });
        if (results) res.status(200).json(results);
        else res.status(200).json({ message: "QR Not Found" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.qrHistoryModel = { editQrHistoryById, deleteQrHistoryById };