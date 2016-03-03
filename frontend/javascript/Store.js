import Router from './Router';
import User from './User';
import Api from './Api';

let menu = {
    'login': 'Log in',
    'signup': 'Sign up',
}

export default class Store {
    constructor() {
        this.state = {
            menu
        };
        this.changeHandlers = [];
        let tc = this.triggerChange.bind(this);

        this.api = new Api();
        this.router = new Router(tc);
        this.user = new User(this.api, tc);
    }

    setState(key, value) {
        this.state[key] = value;
        this.triggerChange();
    }

    triggerChange() {
        for(let handler of this.changeHandlers)
            handler();
    }

    onChange(handler) {
        this.changeHandlers.push(handler);
    }
}
