const express = require('express');
var bodyParser = require('body-parser');
const JudgeService = require('./services/dotnet-judge-service.js')

var router = express.Router();
router.use(bodyParser.json());

router.route('/dotnet/check')
    .post(async (req, res) => {
        const judgeService = new JudgeService();
        res.send(await judgeService.check(req.body));
    });

module.exports.routes = router;