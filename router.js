const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const logger = require('node-file-logger');

const ACCESS_DENIED_MESSAGE = 'Access is denied.';
const TOKEN_KEY = '1a2b-3c4d-5e6f-7g8h';

const JudgeService = require('./services/judge-service.js');
const QuizStorageProvider = require('./services/quiz-storage-provider.js');
const authService = new (require('./services/auth-service.js'))();

const router = express.Router();
router.use(bodyParser.json());
router.use(methodOverride());

router.use((request, response, next) => {
    try {
        if (request.headers.referer && request.headers.referer.match(/\/quiz\?num=\d/g)) {
            request.application = 'localhost';
            next();
        } else if (request.headers.authorization) {
          jwt.verify(
            request.headers.authorization.split(' ')[1],
            TOKEN_KEY,
            async (err, payload) => {
                if (err)  { 
                    next();
                }
                else if (payload) {
                    const application = await authService.getApplicationById(payload.id);
                    if (application !== null) {
                        request.application = application;
                    }
                    
                    next();
                }  
            }
          );
        } else {
            next();
        }
    } catch (error) {
        logger.Error({
            errorMessage: error.message,
            serviceName: 'AuthService',
            methodName: 'Jwt-Mdw',
            context: { authHeader: request.headers.authorization }
        });
        response.status(500).send({ error: error.message });
    }
});

router.route('/auth')
    .post(async (request, response) => {
        
        let ipV4 = request.headers['x-forwarded-for'];
        if (!ipV4) {
            ipV4 = request.connection.remoteAddress;
        }

        const authContext = { applicationId: request.body.applicationId, ipV4: ipV4 };
        
        try {
         
            if (await authService.verifyApplication(request.body.applicationId, request.body.password, ipV4)) {
                logger.Info({
                    message: 'Authentication succeeded.',
                    serviceName: 'AuthService',
                    methodName: 'VerifyApplication',
                    context: authContext
                });
                response.status(200).json({
                    id: request.body.applicationId,
                    token: jwt.sign({ id: request.body.applicationId }, TOKEN_KEY),
                });
            } else {
                logger.Info({
                    errorMessage: 'Authentication failed.',
                    serviceName: 'AuthService',
                    methodName: 'VerifyApplication',
                    context: authContext
                });
                response.status(403).json({ message: ACCESS_DENIED_MESSAGE });
            }
        } catch (error) {
            logger.Error({
                errorMessage: error.message,
                serviceName: 'AuthService',
                methodName: 'VerifyApplication',
                context: authContext
            });
            response.status(500).send({ error: error.message });
        }
    });

router.route('/check')
    .post(async (request, response) => {
        if (!request.application) {
            logger.Info({
                errorMessage: 'Authentication failed.',
                serviceName: 'AuthService',
                methodName: 'VerifyApplication',
                context: { userId: request.body.userId } 
            });
            response.status(403).send({ message: ACCESS_DENIED_MESSAGE });
        } else {
            try {
                const judgeService = new JudgeService();
                response.send(await judgeService.check(request.body));
            } catch (error) {
                logger.Error({
                    errorMessage: error.message,
                    serviceName: 'JudgeService',
                    methodName: 'check',
                    context: { userId: request.body.userId, quizNumber: request.body.quizNumber }
                });
                response.status(500).send({ error: error.message })
            }
        }
    });

router.route('/quiz')
    .get(async (request, response) => {
        if (!request.application) {
            logger.Info({
                errorMessage: 'Authentication failed.',
                serviceName: 'AuthService',
                methodName: 'VerifyApplication'
            });
            response.status(403).send({ message: ACCESS_DENIED_MESSAGE });
        } else {
            const quiz = await (new QuizStorageProvider()).getByQuizNumber(request.query.num);
            
            delete quiz['InputType'];
            delete quiz['OutputType'];
            delete quiz['InputData'];
            delete quiz['ExpectedOutputs'];
           
            response.send(quiz);
        }
    });

module.exports.routes = router;