"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = __importDefault(require("../config"));
var database;
if (config_1.default.env === 'test') {
    database = new pg_1.Pool({
        port: config_1.default.postgres_port,
        host: config_1.default.postgres_host,
        database: config_1.default.postgres_database_test,
        user: config_1.default.postgres_username,
        password: config_1.default.postgres_password
    });
}
else {
    database = new pg_1.Pool({
        port: config_1.default.postgres_port,
        host: config_1.default.postgres_host,
        database: config_1.default.postgres_database,
        user: config_1.default.postgres_username,
        password: config_1.default.postgres_password
    });
}
exports.default = database;
