"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageNotFoundMiddleware = function (request, response, next) {
    response.status(404).json({ message: 'Page not found' });
};
exports.default = pageNotFoundMiddleware;
