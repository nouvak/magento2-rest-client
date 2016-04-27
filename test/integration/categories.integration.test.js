var chai = require('chai');
var credentials = require('../config');
var assert = chai.assert;

var Magento2Client = require('../../index').Magento2Client;

suite('categories tests', function () {
    test('list categories test', function (done) {
        var client = Magento2Client(credentials);
        client.categories.list()
            .then(function (categories) {
                assert.equal(categories.parentId, 1);
            })
            .then(done, done);
    });

    test('create category test', function (done) {
        var client = Magento2Client(credentials);
        var newCategory = {
            category: {
                parentId: 3,
                name: 'Category from integratin test',
                isActive: true,
                includeInMenu: true,
            }
        };
        client.categories.create(newCategory)
            .then(function (result) {
                assert.equal(result.parentId, 3);
            })
            .then(done, done);
    })
});


