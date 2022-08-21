"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = require("../../controllers/users.controller");
var middlewares_1 = require("../../middlewares");
var usersRoutes = (0, express_1.Router)();
usersRoutes.route('/')
    .get(middlewares_1.authTokenMiddleware, users_controller_1.getAllUsers)
    .post(middlewares_1.validateSignUpMiddleware, users_controller_1.createUser)
    .patch(middlewares_1.authTokenMiddleware, users_controller_1.changePassword)
    .delete(middlewares_1.authTokenMiddleware, users_controller_1.deleteUser);
usersRoutes.route('/:id')
    .get(middlewares_1.authTokenMiddleware, users_controller_1.getUser)
    .put(middlewares_1.authTokenMiddleware, users_controller_1.updateUser);
usersRoutes.route('/check')
    .post(users_controller_1.checkEmailExistence);
usersRoutes.route('/reset')
    .patch(middlewares_1.resetPasswordTokenMiddleware, users_controller_1.forgotPassword);
usersRoutes.route('/auth')
    .post(middlewares_1.validateLoginMiddleware, users_controller_1.authenticateUser);
exports.default = usersRoutes;
