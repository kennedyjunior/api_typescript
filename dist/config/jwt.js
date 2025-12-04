"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    secret: process.env.JWT_SECRET || "qwerfghjkfASD2345dfgHJKLzxcvbnm!@#",
    expiresIn: "1h",
};
