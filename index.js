'use strict';

var RestClient = require('./lib/rest_client').RestClient;
var categories = require('./lib/categories');
var products = require('./lib/products');

module.exports.Magento2Client = function (options) {
    var instance = {};

    var client = RestClient(options);

    instance.categories = categories(client);
    instance.products = products;

    return instance;
}
