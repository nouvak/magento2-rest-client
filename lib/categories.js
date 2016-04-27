module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }
    
    module.create = function (newCategory) {
        return restClient.post('/categories', newCategory);
    }

    return module;
}
