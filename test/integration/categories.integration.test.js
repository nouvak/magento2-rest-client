var chai = require('chai');
var credentials = require('../config');
var assert = chai.assert;

var Magento2Client = require('../../index').Magento2Client;

suite('categories tests', function () {
    test('list categories test', function (done) {
        var client = Magento2Client(credentials);
        client.categories.list()
            .then(function (categories) {
                assert.equal(categories, '');
            })
            .then(done, done);
    });
});


