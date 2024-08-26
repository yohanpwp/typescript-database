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
exports.postLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../routes/database"));
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUser = req.body;
    if (!reqUser) {
        res.status(200).json({ message: 'Please check your input values' });
    }
    ;
    try {
        const checkUser = yield database_1.default.findOne({ where: { username: reqUser.username.toLowerCase(), isActive: true } });
        if (checkUser) {
            bcrypt_1.default.compare(reqUser.password, checkUser.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return;
                }
                if (result) {
                    res.status(200).json({ message: 'User logged in successfully' });
                }
                else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            });
        }
        else if (!checkUser) {
            res.status(401).json({ message: 'Invalid username or password' });
        }
        ;
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                message: 'Bad Request',
                errors: err.message
            });
        }
        else {
            console.error('An unknown error occurred');
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.postLogin = postLogin;
