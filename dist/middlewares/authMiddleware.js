"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token não enviado" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.jwtConfig.secret);
        req.user = decoded; // adiciona user ao request
        next();
    }
    catch (_b) {
        return res.status(401).json({ message: "Token inválido" });
    }
}
