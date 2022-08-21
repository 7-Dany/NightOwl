"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginMiddleware = exports.validateSignUpMiddleware = exports.resetPasswordTokenMiddleware = exports.pageNotFoundMiddleware = exports.errorMiddleware = exports.authTokenMiddleware = void 0;
var auth_token_middleware_1 = __importDefault(require("./auth.token.middleware"));
exports.authTokenMiddleware = auth_token_middleware_1.default;
var error_middleware_1 = __importDefault(require("./error.middleware"));
exports.errorMiddleware = error_middleware_1.default;
var pageNotFound_middleware_1 = __importDefault(require("./pageNotFound.middleware"));
exports.pageNotFoundMiddleware = pageNotFound_middleware_1.default;
var resetPassword_token_middleware_1 = __importDefault(require("./resetPassword.token.middleware"));
exports.resetPasswordTokenMiddleware = resetPassword_token_middleware_1.default;
var validateSignUp_middleware_1 = __importDefault(require("./validateSignUp.middleware"));
exports.validateSignUpMiddleware = validateSignUp_middleware_1.default;
var validateLogin_middleware_1 = __importDefault(require("./validateLogin.middleware"));
exports.validateLoginMiddleware = validateLogin_middleware_1.default;
