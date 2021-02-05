const express = require('express');
const router = require('./router');
const cors = require('cors');
const server = new express();
const hbs = require('hbs');

const QuizStorageProvider = require('./services/quiz-storage-provider.js');
const AuthService = require('./services/auth-service.js');

server.use(express.static(__dirname + '/public'));
server.use(cors());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use(express.json());
server.get('/', function (request, response) {
    response.redirect('/quiz?num=1');
});
server.use('/api', router.routes);

server.set("view engine", "hbs");

server.get("/quiz", async (request, response) => {   
    const quiz = await (new QuizStorageProvider()).getByQuizNumber(request.query.num);
    response.render("quiz.hbs", {
        Number: quiz.Number,
        Name: quiz.Name,
        FunctionCode: quiz.InitialFunctionCode,
        Description: new hbs.SafeString(quiz.DescriptionHtml),
        Samples: new hbs.SafeString(quiz.SamplesHtml)
    });
});

server.get("/quiz/invalidate-cache", async (request, response) => { 
    await (new QuizStorageProvider()).invalidateCache(request.query.isDistributed);
    response.redirect('/');
});

server.get("/auth/invalidate-cache", async (request, response) => { 
    await (new AuthService()).invalidateCache(request.query.isDistributed);
    response.redirect('/');
});

// server.listen(3000);
module.exports = server;