"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../../controllers/users.controller");
var auth_token_middleware_1 = __importDefault(require("../../middlewares/auth.token.middleware"));
var resetPassword_token_middleware_1 = __importDefault(require("../../middlewares/resetPassword.token.middleware"));
var usersRoutes = (0, express_1.Router)();
usersRoutes.route('/')
    .get(auth_token_middleware_1.default, users_controller_1.getAllUsers)
    .post(users_controller_1.createUser)
    .patch(auth_token_middleware_1.default, users_controller_1.changePassword)
    .delete(auth_token_middleware_1.default, users_controller_1.deleteUser);
usersRoutes.route('/:id')
    .get(auth_token_middleware_1.default, users_controller_1.getUser)
    .put(auth_token_middleware_1.default, users_controller_1.updateUser);
usersRoutes.route('/check')
    .post(users_controller_1.checkEmailExistence);
usersRoutes.route('/reset')
    .patch(resetPassword_token_middleware_1.default, users_controller_1.forgotPassword);
usersRoutes.route('/auth')
    .post(users_controller_1.authenticateUser);
exports.default = usersRoutes;
