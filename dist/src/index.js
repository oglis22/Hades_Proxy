"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const config_json_1 = __importDefault(require("../config.json"));
const logger_1 = __importDefault(require("./utils/logger"));
const reverse_proxy_1 = __importDefault(require("./reverse_proxy/reverse_proxy"));
const app = (0, express_1.default)();
const logger = new logger_1.default();
logger.logo();
logger.info("Hades Proxy is starting....");
app.use(express_1.default.static(path_1.default.join(__dirname, '../../templates')));
app.set('views', path_1.default.join(__dirname, '../../templates'));
app.set('view engine', 'ejs');
//Regester Hades Proxy Modules
app.use('/', reverse_proxy_1.default);
const server = http_1.default.createServer(app);
server.listen(config_json_1.default.port, () => logger.info(`Proxy is running on port ${config_json_1.default.port}`));
//# sourceMappingURL=index.js.map