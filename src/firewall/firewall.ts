import express from 'express';
import xss_prot from './modules/xss_port';
const firewall = express.Router();
import rate_limiter from './modules/rate_limiter';

firewall.use('/', xss_prot);
firewall.use('/', rate_limiter);

export default firewall;