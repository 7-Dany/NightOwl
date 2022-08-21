"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Yup = __importStar(require("yup"));
var signUpSchema = Yup.object({
    username: Yup.string().required('Username Required').min(5),
    email: Yup.string().required('Email Required').email(),
    password: Yup.string().required('Password Required').min(8, 'Password is too short')
});
var validateSignUp = function (request, response, next) {
    var _a = request.body, username = _a.username, email = _a.email, password = _a.password;
    var user = { username: username, email: email, password: password };
    signUpSchema.validate(user)
        .then(function (valid) {
        if (valid) {
            next();
        }
    })
        .catch(function (error) {
        response.status(422).json({ status: 'Failed', message: error.message });
    });
};
exports.default = validateSignUp;
