function NotFound({ store }) {
    let route = store.getLocation();
    return <p>Route { route + "" } was not found:(</p>;
}
function Login({ store }) {
        let name = store.get('name');
    return <p>Hello {name}!</p>;
}
function App({ store }) {
    return store.getCurrentComponent();
}

class Store {
    constructor(state) {
        this.state = state;
    }

    get(key) {
        return this.state[key];
    }

    getCurrentComponent() {
        return React.createElement(this.getCurrentHandler(), { store: this });
    }

    getCurrentHandler() {
        return this.getRouter()(this.getLocation());
    }

    getLocation() {
        return 'login';
    }

    getRouter() {
        return (location) => location == 'login' ? Login : NotFound;
    }
}

let store = new Store({name: 'world'});

React.render(<App store={store} />, document.getElementById('app'));
