module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        restClient.get('/categories');
        return 'categories';
    }

    return module;
}
