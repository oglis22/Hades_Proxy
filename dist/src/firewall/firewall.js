"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const xss_port_1 = __importDefault(require("./modules/xss_port"));
const firewall = express_1.default.Router();
const rate_limiter_1 = __importDefault(require("./modules/rate_limiter"));
firewall.use('/', xss_port_1.default);
firewall.use('/', rate_limiter_1.default);
exports.default = firewall;
//# sourceMappingURL=firewall.js.map