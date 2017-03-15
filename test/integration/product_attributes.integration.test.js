var chai = require('chai');
var credentials = require('../config');
var assert = chai.assert;

var Magento2Client = require('../../index').Magento2Client;

suite('products attritbutes tests', function () {
    var client;

    before(function () {
        client = Magento2Client(credentials);
    });

    test('list product attributes test', function (done) {
        client.productAttributes.list()
            .then(function (productAttributes) {
                assert.isTrue(productAttributes.items.length > 0);
            })
            .then(done, done);
    });

    test('get product attribute test', function (done) {
        client.productAttributes.get('swatch_image')
            .then(function (productAttributes) {
                assert.isNotNull(productAttributes);
            })
            .then(done, done);
    });

    test('create product attribute test', function (done) {
        var newProductAttribute = {
            'attribute': {
                'attribute_code': 'test123',
                'frontend_input': 'select',
                'is_required': false,
                'frontend_labels': [{
                    'store_id': 0,
                    'label': 'Test Front End Store'
                }]
            }
        };
        client.productAttributes.create(newProductAttribute)
            .then(function (result) {
                assert.isNotNull(result);
            })
            .then(done, done);
    });

    test('update product attribute test', function (done) {
        var productAttributeUpdate = {
            'attribute': {
                'attribute_id': undefined,
                'attribute_code': 'test123',
                'is_required': false,
                'frontend_input': 'select',
                'frontend_labels': [{
                    'store_id': 0,
                    'label': 'Test Front End Store Updated'
                }]
            }
        };
        client.productAttributes.get('test123')
            .then(function (productAttributes) {
                var attributeId = productAttributes.attributeId;
                productAttributeUpdate.attribute['attribute_id'] = attributeId;
                return;
            })
            .then(function () {
                return client.productAttributes.update('test123', productAttributeUpdate);
            })
            .then(function (result) {
                assert.isNotNull(result);
                assert.equal(result.defaultFrontendLabel, 'Test Front End Store Updated');
            })
            .then(done, done);
    });

    test('delete product attribute test', function (done) {
        client.productAttributes.delete('test123')
            .then(function (result) {
                assert.isTrue(result);
            })
            .then(done, done);
    })
});
