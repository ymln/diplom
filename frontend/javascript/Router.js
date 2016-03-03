import Main from './Main';
import NotFound from './NotFound';
import Login from './Login';
import SignUp from './SignUp';

let routes = {
    '': Main,
    '_not-found': NotFound,
    'login': Login,
    'signup': SignUp,
};

export default class Router {
    constructor(onChange) {
        this.route = this.currentRoute();
        this.state = {
            route: this.currentRoute(),
        };
        this.onChange = onChange;
    }

    setState(key, value) {
        this.state[key] = value;
        this.onChange();
    }

    currentRoute() {
        //TODO
        return '';
    }

    component() {
        if(routes[this.state.route]) {
            return routes[this.state.route];
        } else {
            return routes['_not-found'];
        }
    }

    changeRoute(route) {
        this.setState('route', route);
    }
}
