import express from 'express';
import httpProxy from 'http-proxy';
const reverse_proxy = express.Router();
import config from '../../config.json';
import Logger from '../utils/logger';
const logger = new Logger();

reverse_proxy.use((req, res) => {
    const sub_domains = config.subdomain_routing;
    const host = req.headers.host;
    const domain = config.domain;

    if (config.domain_required == true) {
        if (!host.endsWith(domain)) {
            logger.info(req.ip + " Tried to connect but 'domain_required' is enabled");
            return res.render('security', { message: "error" });
        }
    }

    const list = host.split(".");
    
    if (list.length !== 3) {
        if (!config.proxied) {
            return res.redirect(config.domain_routing);
        }

        const proxy = httpProxy.createProxy({});
        proxy.web(req, res, { target: config.domain_routing }, (err) => {
            logger.error(`Error while redirecting to target-server ${config.domain_routing}: ${err}`);
            return res.render('site_not_found', { error_message: `Error while redirecting ${config.domain_routing}` });
        });
        return;
    }

    if (list.length === 3) {
        const sub = list[0];

        const matchedSubdomain = sub_domains.find(sd => sd.subdomain === sub);
        
        if (matchedSubdomain) {
            if (!matchedSubdomain.proxied) {
                return res.redirect(matchedSubdomain.target);
            }

            const proxy = httpProxy.createProxy({});
            proxy.web(req, res, { target: matchedSubdomain.target }, (err) => {
                logger.error(`Error while redirecting to target-server ${matchedSubdomain.subdomain} -> ${matchedSubdomain.target}: ${err}`);
                return res.render('site_not_found', { error_message: `Error while redirecting ${matchedSubdomain.target}` });
            });
            return;
        } else {
            logger.info(`Subdomain not found: ${sub}`);
            return res.render('site_not_found', { error_message: `Subdomain not recognized: ${sub}` });
        }
    }
});

export default reverse_proxy;
