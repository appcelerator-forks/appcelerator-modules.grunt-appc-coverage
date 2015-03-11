var test = require('unit.js'),
    coverage = require('../lib/appc-coverage.js'),
    fs = require('fs'),
    dns = require('dns'),
    url = require('url');

describe('library', function () {
    it('coverage.getOptions();', function () {
        var options = coverage.getOptions();

        test.object(options)
            .hasProperty('service')
            .hasProperty('git');
    });

    it('coverage.parseLcov();', function (done) {
        var lcovString = fs.readFileSync('./test/fixtures/lcov.info').toString();
        coverage.parseLcov(lcovString, function(err, data) {
            test.assert(err == null, err);
            test.assert(JSON.stringify(data) === fs.readFileSync('./test/expected/coverage.txt').toString(), 'Files did not match');
            done();
        });
    });
});

describe('DNS Check', function() {
    it('dns.resolve(' + url.parse(coverage.SERVER).host + ')', function (done) {
        dns.resolve(url.parse(coverage.SERVER).host, function (err, addresses) {
            test.assert(err == null, err);
            test.assert(addresses.length > 0, 'No addresses found');
            done();
        });
    });
});
