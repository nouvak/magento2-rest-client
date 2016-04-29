var chai = require('chai');
var credentials = require('../config');
var assert = chai.assert;

var Magento2Client = require('../../index').Magento2Client;

suite('products tests', function () {
    var client;

    before(function() {
        client = Magento2Client(credentials);
    });

    test('list products test', function (done) {
        client.products.list()
            .then(function (products) {
                assert.equal(products.parentId, 1);
            })
            .then(done, done);
    });

    test('create product test', function (done) {
        var newCategory = {
            category: {
                parentId: 3,
                name: 'Category from integration test',
                isActive: true,
                includeInMenu: true,
            }
        };
        client.categories.create(newCategory)
            .then(function (result) {
                assert.equal(result.parentId, 3);
            })
            .then(done, done);
    });

    test('update product test', function (done) {
        var categoryUpdate = {
            category: {
                parentId: 3,
                name: 'Podkategorija 1 updated',
                isActive: true,
                includeInMenu: true,
            }
        };
        client.categories.update(4, categoryUpdate)
            .then(function (result) {
                assert.equal(result.parentId, 3);
            })
            .then(done, done);
    });

    test('delete product test', function (done) {
        client.categories.delete(23)
            .then(function (result) {
                assert.isTrue(result);
            })
            .then(done, done);
    })
});

