'use strict';

var RestClient = require('./lib/rest_client').RestClient;
var categories = require('./lib/categories');
var products = require('./lib/products');
var productMedia = require('./lib/product_media');
var productAttributes = require('./lib/product_attributes');

const MAGENTO_API_VERSION = 'V1';

module.exports.Magento2Client = function (options) {
    var instance = {};

    options.version = MAGENTO_API_VERSION;
    
    var client = RestClient(options);

    instance.categories = categories(client);
    instance.products = products(client);
    instance.productAttributes = productAttributes(client);
    instance.productMedia = productMedia(client);

    return instance;
}
