module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/categories');
    }
    
    module.create = function (categoryAttributes) {
        return restClient.post('/categories', categoryAttributes);
    }

    module.update = function (categoryId, categoryAttributes) {
        var strCategoryId = categoryId.toString();
        return restClient.put('/categories/' + strCategoryId, categoryAttributes);
    }

    module.delete = function (categoryId) {
        var strCategoryId = categoryId.toString();
        return restClient.delete('/categories/' + strCategoryId);
    }

    return module;
}
