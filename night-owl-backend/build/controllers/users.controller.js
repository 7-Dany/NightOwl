"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.deleteUser = exports.forgotPassword = exports.checkEmailExistence = exports.changePassword = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
var users_model_1 = require("../models/users.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
var bcrypt_1 = require("bcrypt");
var usersModel = new users_model_1.UsersModel();
var getAllUsers = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, usersModel.index()];
            case 1:
                users = _a.sent();
                response.status(200).json({
                    status: 'Success',
                    data: __spreadArray([], users, true),
                    message: 'Users got retrieved successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, usersModel.show(id)];
            case 1:
                user = _a.sent();
                response.status(200).json({
                    status: 'Success',
                    data: __assign({}, user),
                    message: 'User got retrieved successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, checkEmail, user, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newUser = {
                    username: request.body.username,
                    email: request.body.email,
                    image: request.body.image,
                    is_verified: false,
                    password: request.body.password
                };
                return [4 /*yield*/, usersModel.showByEmail(newUser.email)];
            case 1:
                checkEmail = _a.sent();
                if (checkEmail) {
                    response.status(409).json({ status: 'Failed', message: 'Email is already used' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usersModel.create(newUser)];
            case 2:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token);
                response.status(201).json({
                    statue: 'Success',
                    data: __assign(__assign({}, user), { token: token }),
                    message: 'User got created successfully'
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, getUser_1, checkEmail, updatedUser, token, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                user = {
                    username: request.body.username,
                    email: request.body.email,
                    image: request.body.image
                };
                id = request.params.id;
                if (!user.email) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.show(id)];
            case 1:
                getUser_1 = _a.sent();
                return [4 /*yield*/, usersModel.showByEmail(user.email)];
            case 2:
                checkEmail = _a.sent();
                if (checkEmail && getUser_1.email !== user.email) {
                    response.status(409).json({
                        status: 'Failed', message: 'This email is already used please use another email'
                    });
                    return [2 /*return*/];
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, usersModel.update(id, user)];
            case 4:
                updatedUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: updatedUser }, config_1.default.token);
                response.status(200).json({
                    status: 'Success',
                    data: __assign(__assign({}, updatedUser), { token: token }),
                    message: 'User got updated successfully'
                });
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var changePassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, oldToken, decode, password, email, getUserPassword, checkPassword, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                authorizationHeader = request.headers.authorization;
                oldToken = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
                decode = jsonwebtoken_1.default.decode(oldToken);
                password = request.body.password;
                if (!decode) return [3 /*break*/, 3];
                email = decode['user'].email;
                console.log(email);
                return [4 /*yield*/, usersModel.showPassword(email)];
            case 1:
                getUserPassword = _a.sent();
                checkPassword = (0, bcrypt_1.compareSync)(password + config_1.default.pepper, getUserPassword.password);
                if (checkPassword) {
                    response.status(409).json({
                        status: 'Failed',
                        message: 'new password cant be the same as old password'
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, usersModel.updatePassword(email, password)];
            case 2:
                _a.sent();
                response.status(200).json({
                    status: 'Success',
                    message: 'Password got changed successfully'
                });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var checkEmailExistence = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = request.body.email;
                return [4 /*yield*/, usersModel.showByEmail(email)];
            case 1:
                user = _a.sent();
                if (user) {
                    token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.resetToken);
                    response.status(200).json({
                        status: 'Success',
                        data: __assign(__assign({}, user), { token: token }),
                        message: 'User got retrieved successfully'
                    });
                }
                else {
                    response.status(204).json({
                        status: 'Failed',
                        message: 'Email is not exist'
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkEmailExistence = checkEmailExistence;
var forgotPassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, oldToken, decode, password, email, updatedUser, token, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                authorizationHeader = request.headers.authorization;
                oldToken = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
                decode = jsonwebtoken_1.default.decode(oldToken);
                password = request.body.password;
                email = decode['user'].email;
                return [4 /*yield*/, usersModel.updatePassword(email, password)];
            case 1:
                updatedUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: updatedUser }, config_1.default.token);
                response.status(200).json({
                    status: 'Success',
                    data: __assign(__assign({}, updatedUser), { token: token }),
                    message: 'Password get updated successfully'
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                next(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var deleteUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, checkEmail, deleteUser_1, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                email = request.body.email;
                return [4 /*yield*/, usersModel.showByEmail(email)];
            case 1:
                checkEmail = _a.sent();
                if (!checkEmail) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.delete(email)];
            case 2:
                deleteUser_1 = _a.sent();
                response.status(202).json({
                    status: 'Success',
                    data: __assign({}, deleteUser_1),
                    message: 'User got deleted successfully'
                });
                return [3 /*break*/, 4];
            case 3:
                response.status(404).json({ status: 'Success', message: 'User is not exist' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_8 = _a.sent();
                next(error_8);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var authenticateUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userToAuthenticate, checkEmail, authenticatedUser, token, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userToAuthenticate = {
                    email: request.body.email,
                    password: request.body.password
                };
                return [4 /*yield*/, usersModel.showByEmail(userToAuthenticate.email)];
            case 1:
                checkEmail = _a.sent();
                if (!checkEmail) return [3 /*break*/, 3];
                return [4 /*yield*/, usersModel.authenticate(userToAuthenticate)];
            case 2:
                authenticatedUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, config_1.default.token);
                if (!authenticatedUser) {
                    response.status(401).json({ status: 'Unauthorized user', message: 'wrong email or password' });
                    return [2 /*return*/];
                }
                else {
                    response.status(200).json({
                        status: 'success',
                        data: __assign(__assign({}, authenticatedUser), { token: token }),
                        message: 'User got authenticated successfully'
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                response.status(422).json({ status: 'Failed', message: 'User is not exist' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_9 = _a.sent();
                next(error_9);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.authenticateUser = authenticateUser;
