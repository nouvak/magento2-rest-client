var chai = require('chai');
var credentials = require('../config');
var assert = chai.assert;

var Magento2Client = require('../../index').Magento2Client;

suite('categories tests', function () {
    test('list categories test', function () {
        var client = Magento2Client(credentials);

        assert.equal(client.categories.list(), 'categories');
    });
});


