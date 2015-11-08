import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import clone from 'clone';

import * as api from './api';

import 'bootstrap/less/bootstrap.less';

const ErrorList = ({ errors }) => {
    if(errors)
        return (
            <div>
                { errors.map((error) =>
                             <div className='alert alert-danger' role='alert' key={ error }>{ error }</div>
                             )
                }
            </div>
        );
    else
        return <span />;
};

class LoginForm extends React.Component {
    render() {
        const { email, password, errors } = this.props;
        return (
            <form method='post' onSubmit={ (event) => this.submit(event) }>
                <ErrorList errors={ errors } />
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' name='email' value={ email } className='form-control' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' value={ password } type='password' className='form-control' />
                </div>
                <button type='submit' className='btn btn-primary' >Submit</button>
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
        case 'login-errors':
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
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 jumbotron'>
                        <LoginForm
                            email={ email }
                            password={ password }
                            errors={ errors }
                            onSubmit={ this.login.bind(this) } />
                    </div>
                </div>
            </div>
        );
    }

    login() {
        const { email, password, dispatch } = this.props;
        api.post('login', { email, password })
            .then((result) => dispatch({ type: 'token', token: result.token }))
            .catch((result) =>
                   {
                       let errors = result.errors || ['Unknown error'];
                       dispatch({ type: 'login-errors', errors });
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
