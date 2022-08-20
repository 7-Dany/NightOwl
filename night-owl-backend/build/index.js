"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("./config"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var routes_1 = __importDefault(require("./routes"));
var error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
var pageNotFound_middleware_1 = __importDefault(require("./middlewares/pageNotFound.middleware"));
var PORT = config_1.default.port || 4000;
// create an instance server
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api', routes_1.default);
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
});
io.on('connect', function (socket) {
});
app.use(error_middleware_1.default);
app.use(pageNotFound_middleware_1.default);
// start express server
server.listen(PORT, function () {
    console.log("Server is starting at http://localhost:".concat(PORT));
});
exports.default = app;
