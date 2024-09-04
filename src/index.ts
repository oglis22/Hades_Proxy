import http from 'http';
import express from 'express';
import path from 'path';
import config from '../config.json';
import Logger from './utils/logger';
import reverse_proxy from './reverse_proxy/reverse_proxy';
import firewall from './firewall/firewall';

const app = express();
const logger = new Logger();

logger.logo();
logger.info("Hades Proxy is starting....");

app.use(express.static(path.join(__dirname, '../../templates')));
app.set('views', path.join(__dirname, '../../templates'));
app.set('view engine', 'ejs');

//Regester Hades Proxy Modules
app.use('/', firewall);
app.use('/', reverse_proxy)

//Checking Config
if (!config.domain_requierd) logger.warn(`Running 'Hades Proxy' without domain_required is not recomended`);

const server = http.createServer(app);
server.listen(config.port, () => logger.info(`Proxy is running on port ${config.port}`));