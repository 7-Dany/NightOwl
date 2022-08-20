"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var api_1 = require("./api");
var routes = (0, express_1.Router)();
routes.use('/users', api_1.usersRoutes);
routes.get('/api', function (req, res) {
    res.send('Hello from api');
});
exports.default = routes;
