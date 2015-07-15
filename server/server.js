var express = require('express'),
    http = require('http'),
    namespace = require('express-namespace'),
    domain = require('domain'),
    config = require('./config'),
    initializeController = require('./initialization/initializeController'),
    mainDomain = domain.create(),
    app = express(),
    server = null;

initializeController.initialize(app);

mainDomain.on('error', function(err) {
    if (server && server.close) {
        server.close();
    }
});

mainDomain.run(function() {
        server = http.createServer(app).listen(config.port, function() {
            console.log('server started');
        });
    }
);

module.exports = app;