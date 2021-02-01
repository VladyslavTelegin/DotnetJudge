const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const JudgeService = require('./services/judge-service.js');
const AuthService = require('./services/auth-service.js');
const authService = new AuthService();
const ACCESS_DENIED_MESSAGE = 'Access is denied.';
const tokenKey = '1a2b-3c4d-5e6f-7g8h';

var router = express.Router();
router.use(bodyParser.json());
router.use((req, res, next) => {
    if (req.headers.referer && req.headers.referer.match(/\/quiz\?num=\d/g)) {
        req.application = 'localhost';
    } else if (req.headers.authorization) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        tokenKey,
        async (err, payload) => {
            if (err)  { 
                next();
            }
            else if (payload) {
                const application = await authService.getApplicationById(payload.id);
                if (application !== null) {
                    req.application = application;
                }
                if (!req.application) { 
                    next();
                }
            }  
        }
      );
    } else {
        next();
    }
});

router.route('/auth')
    .post(async (req, res) => {
        if (await authService.verifyApplication(req.body.applicationId, req.body.password, req.body.ipV4)) {
            res.status(200).json({
                id: req.body.applicationId,
                token: jwt.sign({ id: req.body.applicationId }, tokenKey),
            });
        } else {
            res.status(403).json({ message: ACCESS_DENIED_MESSAGE });
        }
    });

router.route('/check')
    .post(async (req, res) => {
        if (!req.application) {
            res.status(403).send({ message: ACCESS_DENIED_MESSAGE });
        } else {
            const judgeService = new JudgeService();
            res.send(await judgeService.check(req.body));
        }
    });

module.exports.routes = router;