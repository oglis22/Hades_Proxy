import express from 'express';
import httpProxy from 'http-proxy';
const reverse_proxy = express.Router();
import config from '../../config.json';
import path from 'path';
import Logger from '../utils/logger';
const logger = new Logger();

reverse_proxy.use((req, res) => {

    const sub_domains = config.subdomain_routing;

if (config.domain_requierd == true) {
    const host = req.headers.host;
    const domain = config.domain;

    if (!host.endsWith(domain)) {
        logger.info(req.ip + " Tried to connect but 'domain_required' is enabled");
        res.render('security', {message: "error"});
        return;
    }
}


    
    const list = req.headers.host.split(".");
    if (list.length != 3) {
        if (!config.proxied) {
            res.redirect(config.domain_routing);
            return;
        }
        const proxy = httpProxy.createProxy({});
        proxy.web(req, res, {target: config.domain_routing}, (err) => {
            logger.error(`Error while redirecting to target-server ${config.domain_routing}: ${err}`);
            res.render('site_not_found', {error_message: `Error while redirecting ${config.domain_routing}`});
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
                const proxy = httpProxy.createProxy({});
                proxy.web(req, res, {target: sd.target}, (err) => {
                    logger.error(`Error while redirecting to target-server ${sd.subdomain} -> ${sd.target}: ${err}`);
                    res.render('site_not_found', {error_message: `Error while redirecting ${sd.target}`});
                    return;
                });
            }
        });
    }
    

});

export default reverse_proxy;
