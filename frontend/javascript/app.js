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
        const { errors, email, password, onEmailChange, onPasswordChange } = this.props;
        return (
            <form method='post' onSubmit={ (event) => this.submit(event) }>
                <ErrorList errors={ errors } />
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' name='email' className='form-control'
                        value={ email } onChange={ onEmailChange } />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' name='password' type='password' className='form-control'
                        value={ password } onChange={ onPasswordChange } />
                </div>
                <button type='submit' className='btn btn-primary' >Login</button>
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

    switch(action.type) {
        case 'user:set-token':
            state.token = action.token;
            break;
        case 'user:set-errors':
            state.errors = action.errors;
            break;
        case 'user:set-email':
            state.email = action.email;
            break;
        case 'user:set-password':
            state.password = action.password;
            break;
        default:
            console.log('Unknown action', action);
    }
    return state;
}

let store = createStore(dispatcher);

@connect(id)
class App extends React.Component {
    render() {
        const { errors, email, password, dispatch } = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 jumbotron'>
                        <LoginForm
                            errors={ errors }
                            email={ email }
                            password={ password }
                            onEmailChange={ (event) => dispatch({ type: 'user:set-email', email: event.target.value }) }
                            onPasswordChange={ (event) => dispatch({ type: 'user:set-password', password: event.target.value }) }
                            onSubmit={ this.login.bind(this) } />
                    </div>
                </div>
            </div>
        );
    }

    login() {
        const { email, password, dispatch } = this.props;
        api.post('users/login', { email, password })
            .then((result) =>
                  {
                      dispatch({ type: 'user:set-token', token: result.token });
                      api.setToken(result.token);
                  })
            .catch((result) =>
                   {
                       let errors = result.errors || ['Unknown error'];
                       dispatch({ type: 'user:set-errors', errors });
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
