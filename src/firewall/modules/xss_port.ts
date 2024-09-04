import express from 'express';
const xss_prot = express.Router();
import path from 'path';
import Logger from '../../utils/logger';
const logger = new Logger();

xss_prot.use(async (req, res, next) => {

    const xssPattern = /(<script.*?>.*?<\/script>|<\/?script>|<.*?javascript:.*?>|<.*?data:.*?>|<.*?on\w+.*?>|<iframe.*?>|<object.*?>|<embed.*?>|<frame.*?>|<frameset.*?>|<\/iframe>|<\/object>|<\/embed>|<\/frame>|<\/frameset>|data:[\w+\/]*;base64,[\w+\/=]+|<!--.*?<script.*?>.*?<\/script>.*?-->|eval\(|execCommand\(|setTimeout\(|setInterval\(|Function\(|document\.write\(|<.*?\s+on\w+[\s]*=[\s]*['"'].*?['"'])/i;

    if (xssPattern.test(req.url) || xssPattern.test(JSON.stringify(req.body))) {
        res.render('security', {message: "Bad request"});
        logger.warn(`[WAF][XSS] Bad request by ${req.ip}`);
    }

    next();
});


export default xss_prot;