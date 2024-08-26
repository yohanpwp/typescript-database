"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../routes/database"));
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = req.body;
        let username = data.username.toLowerCase();
        if (!data.username || !data.password || !data.firstName)
            return res.status(200).json({ message: 'Please check your input values' });
        else if (!data.createdBy) {
            data.createdBy = username;
        }
        const checkUser = yield database_1.default.findOne({ where: { username: username } });
        if (checkUser)
            return res.status(200).json({ message: 'Username already exists' });
        // Hashing the password before storing it in the database
        bcrypt_1.default.hash(data.password, 5, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Error hashing password:', err);
                return;
            }
            else {
                data.password = hash;
                const user = yield database_1.default.create(data);
                res.status(201).json({ user, message: 'User registered successfully' });
            }
        }));
    }
    catch (error) {
        res.status(400).json({
            message: 'Bad Request',
            errors: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
exports.postRegister = postRegister;
