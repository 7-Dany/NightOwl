"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (error, request, response, next) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    response.status(status).json({ status: status, message: message });
};
exports.default = errorMiddleware;
