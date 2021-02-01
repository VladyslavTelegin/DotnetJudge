const express = require('express');
const router = require('./router');
const cors = require('cors');
const server = new express();
const hbs = require('hbs');
const QuizStorageProvider = require('./services/quiz-storage-provider.js')

server.use(express.static(__dirname + '/public'));
server.use(cors());
server.use(express.json());
server.get('/', function (request, response) {
    response.redirect('/quiz?num=1');
});
server.use('/api', router.routes);

server.set("view engine", "hbs");
server.get("/quiz", async (request, response) => {   
    var quiz = await (new QuizStorageProvider()).getByQuizNumber(request.query.num);
    response.render("quiz.hbs", {
        Number: quiz.Number,
        Name: quiz.Name,
        FunctionCode: quiz.InitialFunctionCode,
        Description: new hbs.SafeString(quiz.DescriptionHtml),
        Samples: new hbs.SafeString(quiz.SamplesHtml)
    });
});

server.get("/quiz/invalidate-cache", (request, response) => { 
    (new QuizStorageProvider()).invalidateCache();
    response.redirect('/');
});

// server.listen(3000);
module.exports = server;