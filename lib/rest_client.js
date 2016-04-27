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

    function apiCall(request_data) {
        logger.debug('Calling API endpoint: ' + request_data.method + ' ' + request_data.url);
        return new Promise(function (resolve, reject) {
            request({
                url: request_data.url,
                method: request_data.method,
                headers: oauth.toHeader(oauth.authorize(request_data, token)),
                json: true,
                body: request_data.body,
            }, function(error, response, body) {
                logger.debug('Response received.');
                if (error) {
                    logger.error('Error occured: ' + error);
                    reject(error);
                }
                resolve(body);
            });
        });
    }

    instance.get = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'GET'
        };
        return apiCall(request_data);
    }

    function createUrl(resourceUrl) {
        return servelrUrl + '/' + apiVersion + resourceUrl;
    }

    instance.post = function (resourceUrl, data) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'POST',
            body: data
        };
        return apiCall(request_data);
    }

    instance.put = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'PUT',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        return apiCall(request_data);
    }

    instance.delete = function (resourceUrl) {
        var request_data = {
            url: createUrl(resourceUrl),
            method: 'DELETE',
            data: {
                status: 'Hello Ladies + Gentlemen, a signed OAuth request!'
            }
        };
        return apiCall(request_data);
    }

    return instance;
}
