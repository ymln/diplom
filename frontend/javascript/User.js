export default class User {
    constructor(api, onChange) {
        this.state = {
            email: '',
            password: '',
            loading: false,
            token: false,
            errors: [],
        };
        this.onChange = onChange;
        this.api = api;
    }

    setState(key, value) {
        this.state[key] = value;
        this.onChange();
    }

    changeEmail(val) {
        this.setState('email', val);
    }

    changePassword(val) {
        this.setState('password', val);
    }

    loginOrSignup(action) {
        this.setState('loading', true);
        this.setState('errors', []);
        this.api[action](this.email, this.password)
            .then((response) => {
                this.setState('loading', false);
                if(response.token) {
                    this.setState('token', response.token);
                } else if (response.error) {
                    this.setState('errors', [response.error]);
                } else {
                    this.setState('errors', ['No token was recieved']);
                }
            })
            .catch((error) => {
                this.setState('loading', false);
                this.setState('errors', ['Unknown error']);
            });
    }

    login() {
        this.loginOrSignup('login');
    }

    signup() {
        this.loginOrSignup('signup');
    }
}
