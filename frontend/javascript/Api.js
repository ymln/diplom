import $ from 'jquery';

const API_ROOT = '/api/v1';

function toPromise($promise) {
    return new Promise(function (resolve, reject) {
        $promise.then(resolve, reject);
    });
}

var token;

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


export default class Api {
    setToken(token_) {
        token = token_;
    }

    login(email, password) {
        return post('users/login', {email, password});
    }

    signup(email, password) {
        return post('users/signup', {email, password});
    }
}
