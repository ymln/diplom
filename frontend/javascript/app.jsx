import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import clone from 'clone';

import * as api from './api';

import 'bootstrap/less/bootstrap.less';

const ErrorList = ({errors}) => {
    if(errors)
        return (
            <ul>
                { errors.map((error) => <li key={ error }>{ error }</li>) }
            </ul>
        );
    else
        return <span />;
};

class RegisterForm extends React.Component {
    render() {
        const { email, password, errors } = this.props;
        return (
            <form method='post' onSubmit={ (event) => this.submit(event) }>
                <ErrorList errors={ errors } />
                <input name='email' value={ email } />
                <input name='password' value={ password } type='password' />
                <input type='submit' />
            </form>
        );
    }

    submit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }
}

function id(x) {
    return x;
}

function dispatcher(state = {}, action) {
    state = clone(state);

    if(!action)
        return state;

    switch(action.type) {
        case 'token':
            state.token = action.token;
            break;
        case 'register-errors':
            state.errors = action.errors;
            break;
    }
    return state;
}

let store = createStore(dispatcher);

@connect(id)
class App extends React.Component {
    render() {
        const { email, password, errors } = this.props;
        return <RegisterForm
            email={ email }
            password={ password }
            errors={ errors }
            onSubmit={ this.register.bind(this) } />;
    }

    register() {
        const { email, password, dispatch } = this.props;
        api.post('register', { email, password })
            .then((result) => dispatch({ type: 'token', token: result.token }))
            .catch((result) =>
                   {
                       let errors = result.errors || ['Unknown error'];
                       dispatch({ type: 'register-errors', errors });
                   }
                  );
    }
}

ReactDOM.render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('app')
);
