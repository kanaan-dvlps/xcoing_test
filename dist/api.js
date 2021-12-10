"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var favorite_router_1 = require("./routes/favorite.router");
var profile_router_1 = require("./routes/profile.router");
var simulator_router_1 = require("./routes/simulator.router");
var process_1 = __importDefault(require("process"));
mongoose_1.default
    .connect("".concat(config_1.DBURL), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    console.log("Connected to DB ".concat(config_1.DBURL));
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.CORS_ORIGINS }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(favorite_router_1.router);
app.use(profile_router_1.router);
app.use(simulator_router_1.router);
var server = app.listen(config_1.PORT, function () {
    console.log("\u2705  Ready on port http://localhost:".concat(config_1.PORT));
    console.log("\u001B[34m\u001B[1mprocess PID ".concat(process_1.default.pid, " started\u001B[0m"));
});
function signalHandler(signal) {
    if (signal) {
        console.log("received signal: ".concat(signal));
        console.log("closing HTTP server");
        server.close(function () {
            console.log("HTTP server closed gracefully");
            mongoose_1.default.connection.close(false, function () {
                console.log("Database connection closed gracefully");
                console.log("process PID ".concat(process_1.default.pid, " stopped"));
                process_1.default.exit(0);
            });
        });
    }
}
;
process_1.default.on('SIGINT', signalHandler);
process_1.default.on('SIGTERM', signalHandler);
//# sourceMappingURL=api.js.map