import $ from 'jquery';

const API_ROOT = '/api/v1';
let token;

function toPromise($promise) {
    return new Promise(function (resolve, reject) {
        $promise.then(resolve, reject);
    });
}

function request(method, uri, data) {
    let url = API_ROOT+'/'+uri;
    data.token = token;
    return toPromise($.ajax({ url, data, method }));
}

function get(uri, data) {
    return request('GET', uri, data);
}

function post(uri, data) {
    return request('POST', uri, data);
}

function setToken(token_) {
    token = token_;
}

export { get, post };
