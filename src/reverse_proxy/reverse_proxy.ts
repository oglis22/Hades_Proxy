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
        if (req.headers.host != config.domain) {
            const absolutePath = path.join(__dirname, '../../../templates/security.html');
            res.sendFile(absolutePath);
            return;
        }
        const proxy = httpProxy.createProxy({});
        proxy.web(req, res, {target: config.domain_routing}, (err) => {
            logger.error(`Error while redirecting to target-server ${config.domain_routing}: ${err}`);
            res.render('site_not_found', {error_message: `Error while redirecting ${config.domain_routing} | domain is not required`});
            return;
        });
        return;
    }

    logger.warn(`Running 'Hades Proxy' without domain_required is not recomended`)
    const list = req.headers.host.split(".");
    if (list.length != 3) {
        const proxy = httpProxy.createProxy({});
        proxy.web(req, res, {target: config.domain_routing}, (err) => {
            logger.error(`Error while redirecting to target-server ${config.domain_routing}: ${err}`);
            res.render('site_not_found', {error_message: `Error while redirecting ${config.domain_routing}`});
            return;
        });
    }
    

    sub_domains.forEach(sd => {
        
        

    });

});

export default reverse_proxy;