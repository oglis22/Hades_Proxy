"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const reverse_proxy = express_1.default.Router();
const config_json_1 = __importDefault(require("../../config.json"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = new logger_1.default();
reverse_proxy.use((req, res) => {
    const sub_domains = config_json_1.default.subdomain_routing;
    if (config_json_1.default.domain_requierd == true) {
        if (req.headers.host != config_json_1.default.domain) {
            logger.info(req.ip + "Tried to connect but 'domain_requierd' is enabled");
            res.render('security', { message: "error" });
            return;
        }
    }
    const list = req.headers.host.split(".");
    if (list.length != 3) {
        if (!config_json_1.default.proxied) {
            res.redirect(config_json_1.default.domain_routing);
            return;
        }
        const proxy = http_proxy_1.default.createProxy({});
        proxy.web(req, res, { target: config_json_1.default.domain_routing }, (err) => {
            logger.error(`Error while redirecting to target-server ${config_json_1.default.domain_routing}: ${err}`);
            res.render('site_not_found', { error_message: `Error while redirecting ${config_json_1.default.domain_routing}` });
            return;
        });
    }
    if (list.length == 3) {
        const sub = list[0];
        sub_domains.forEach(sd => {
            if (sub == sd.subdomain) {
                if (!sd.proxied) {
                    res.redirect(sd.target);
                    return;
                }
                const proxy = http_proxy_1.default.createProxy({});
                proxy.web(req, res, { target: sd.target }, (err) => {
                    logger.error(`Error while redirecting to target-server ${sd.subdomain} -> ${sd.target}: ${err}`);
                    res.render('site_not_found', { error_message: `Error while redirecting ${sd.target}` });
                    return;
                });
            }
        });
    }
});
exports.default = reverse_proxy;
//# sourceMappingURL=reverse_proxy.js.map