"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedError = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var unauthorizedError = function (next) {
    var error = new Error('Login error please try again');
    error.status = 401;
    next(error);
};
exports.unauthorizedError = unauthorizedError;
var validateAuthToken = function (request, response, next) {
    try {
        var authorizationHeader = request.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var decode = jsonwebtoken_1.default.verify(token, config_1.default.token);
        if (decode) {
            next();
        }
        else {
            (0, exports.unauthorizedError)(next);
        }
    }
    catch (error) {
        (0, exports.unauthorizedError)(next);
    }
};
exports.default = validateAuthToken;
