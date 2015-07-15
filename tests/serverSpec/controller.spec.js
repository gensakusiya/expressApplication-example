var should = require('../test').should,
    path = require('path'),
    request = require('supertest'),
    app = require(__dirname + '/../../server/server');

describe('controller map', function() {
    it('load controller map json', function() {
        var result = require(path.join(__dirname, '/../../server/initialization/controllerMap.json'));

        result.should.not.be.empty;
        result['routers'].should.be.a('array');
    })
});

describe('controller', function() {
    describe('home controller', function() {
        it('GET / found', function(done) {
            request(app)
                .get('/')
                .expect(200, done);
        })
    });
});