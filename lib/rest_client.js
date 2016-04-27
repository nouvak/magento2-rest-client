'use strict';

var logger = require('./log');
var OAuth = require('oauth-1.0a');
var request = require('request');

module.exports.RestClient = function (options) {
    var instance = {};

    var servelrUrl = options.url;
    var apiVersion = options.version;
    var oauth = OAuth({
        consumer: {
            public: options.consumerKey,
            secret: options.consumerSecret
        },
        signature_method: 'HMAC-SHA1'
    });
    var token = {
        public: options.accessToken,
        secret: options.accessTokenSecret
    };

    function api_call(request_data) {
        logger.debug('Calling API endpoint: ' + request_data.method + ' ' + request_data.url);
        request({
            url: request_data.url,
            method: request_data.method,
            headers: oauth.toHeader(oauth.authorize(request_data, token)),
            form: request_data.data,
        }, function(error, response, body) {
            logger.debug('Response received.');
            if (error) {
                logger.error('Error occured: ' + error);
                return
            }
            //process your data here
        });
    }

    instance.get = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'GET',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        api_call(request_data);
    }

    function createUrl(resourceUrl) {
        return servelrUrl + '/' + apiVersion + resourceUrl;
    }

    instance.post = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'POST',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        api_call(request_data);
    }

    instance.put = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'PUT',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        api_call(request_data);
    }

    instance.delete = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'DELETE',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        api_call(request_data);
    }

    return instance;
}
