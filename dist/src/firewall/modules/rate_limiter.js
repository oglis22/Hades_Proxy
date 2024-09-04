"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rate_limiter = express_1.default.Router();
const config_json_1 = __importDefault(require("../../../config.json"));
const logger_1 = __importDefault(require("../../utils/logger"));
const logger = new logger_1.default();
let log = true;
const rate_limit = {};
rate_limiter.use(async (req, res, next) => {
    const client_ip = req.ip;
    const current_time = Date.now();
    if (!rate_limit[client_ip]) {
        rate_limit[client_ip] = { count: 1, startTime: current_time };
        next();
        return;
    }
    const time_diff = current_time - rate_limit[client_ip].startTime;
    if (time_diff > config_json_1.default.rate_limiter.window_time) {
        rate_limit[client_ip] = { count: 1, startTime: current_time };
        next();
        return;
    }
    if (rate_limit[client_ip].count >= config_json_1.default.rate_limiter.max_request) {
        res.render('security', { message: "You send to many requests" });
        if (log)
            logger.warn(`[WAF][RL] Bad request ${req.ip} send to many requests`);
        log = false;
        return;
    }
    else {
        log = true;
    }
    rate_limit[client_ip].count++;
    next();
});
exports.default = rate_limiter;
//# sourceMappingURL=rate_limiter.js.map