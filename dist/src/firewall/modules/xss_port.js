"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const xss_prot = express_1.default.Router();
const logger_1 = __importDefault(require("../../utils/logger"));
const logger = new logger_1.default();
xss_prot.use(async (req, res, next) => {
    const xssPattern = /(<script.*?>.*?<\/script>|<\/?script>|<.*?javascript:.*?>|<.*?data:.*?>|<.*?on\w+.*?>|<iframe.*?>|<object.*?>|<embed.*?>|<frame.*?>|<frameset.*?>|<\/iframe>|<\/object>|<\/embed>|<\/frame>|<\/frameset>|data:[\w+\/]*;base64,[\w+\/=]+|<!--.*?<script.*?>.*?<\/script>.*?-->|eval\(|execCommand\(|setTimeout\(|setInterval\(|Function\(|document\.write\(|<.*?\s+on\w+[\s]*=[\s]*['"'].*?['"'])/i;
    if (xssPattern.test(req.url) || xssPattern.test(JSON.stringify(req.body))) {
        res.render('security', { message: "Bad request" });
        logger.warn(`[WAF][XSS] Bad request by ${req.ip}`);
    }
    next();
});
exports.default = xss_prot;
//# sourceMappingURL=xss_port.js.map