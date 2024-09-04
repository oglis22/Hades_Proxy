import express from 'express';
const rate_limiter = express.Router();
import config from '../../../config.json';
import path from 'path';
import Logger from '../../utils/logger';
const logger = new Logger();
let log = true;

const rate_limit = {};

rate_limiter.use(async (req, res, next) => {

    const client_ip = req.ip;
    const current_time = Date.now();

    if (!rate_limit[client_ip]) {
        rate_limit[client_ip] = {count: 1, startTime: current_time};
        next();
        return;
    }

    const time_diff = current_time-rate_limit[client_ip].startTime;

    if (time_diff > config.rate_limiter.window_time) {
        rate_limit[client_ip] = {count: 1, startTime: current_time};
        next();
        return;
    }

    if (rate_limit[client_ip].count >= config.rate_limiter.max_request) {
        res.render('security', {message: "You send to many requests"});
        if (log) logger.warn(`[WAF][RL] Bad request ${req.ip} send to many requests`);
        log = false;
        return;
    } else { log = true; }

    rate_limit[client_ip].count++;
    next();
});

export default rate_limiter;