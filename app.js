const express = require('express');
const router = require('./router');
const cors = require('cors');

const server = new express();

server.use(express.static(__dirname + '/public'));
server.use(cors());
server.use(express.json());
server.get('/', function (req, res) {
    res.redirect('/task1');
});
server.use('/api', router.routes);

server.set("view engine", "hbs");
server.use("/task1", function(request, response){   
    response.render("task1.hbs");
});

server.listen(3000);