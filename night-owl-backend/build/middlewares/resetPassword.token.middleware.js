"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var resetPasswordError = function (next) {
    var error = new Error('Error occurred while resetting password, please try again');
    error.status = 401;
    next(error);
};
var validateResetPasswordToken = function (request, response, next) {
    try {
        var authorizationHeader = request.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var decode = jsonwebtoken_1.default.verify(token, config_1.default.resetToken);
        if (decode) {
            next();
        }
        else {
            resetPasswordError(next);
        }
    }
    catch (error) {
        resetPasswordError(next);
    }
};
exports.default = validateResetPasswordToken;
