module.exports = function (restClient) {
    var module = {};

    module.list = function () {
        return restClient.get('/products');
    }

    module.create = function (productAttributes) {
        return restClient.post('/products', productAttributes);
    }

    module.update = function (productSku, productAttributes) {
        return restClient.put('/products/' + productSku, productAttributes);
    }

    module.delete = function (productSku) {
        return restClient.delete('/products/' + productSku);
    }

    return module;
}

