"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, ENV = _a.ENV, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_DATABASE = _a.POSTGRES_DATABASE, POSTGRES_DATABASE_TEST = _a.POSTGRES_DATABASE_TEST, POSTGRES_USERNAME = _a.POSTGRES_USERNAME, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, AUTH_TOKEN_SECRET = _a.AUTH_TOKEN_SECRET, RESET_PASSWORD_TOKEN_SECRET = _a.RESET_PASSWORD_TOKEN_SECRET;
exports.default = {
    port: parseInt(PORT, 10),
    env: ENV,
    postgres_host: POSTGRES_HOST,
    postgres_port: parseInt(POSTGRES_PORT, 10),
    postgres_database: POSTGRES_DATABASE,
    postgres_database_test: POSTGRES_DATABASE_TEST,
    postgres_username: POSTGRES_USERNAME,
    postgres_password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: parseInt(SALT_ROUNDS, 10),
    token: AUTH_TOKEN_SECRET,
    resetToken: RESET_PASSWORD_TOKEN_SECRET
};
