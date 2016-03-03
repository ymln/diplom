import React from 'react';

import {dispatcherP, dispatcherV} from './utils';
import Input from './Input';
import Errors from './Errors';
import SubmitButton from './SubmitButton';

export default function UserForm({store, action, button}) {
    let user = store.user;
    let {email, password, errors, loading} = user.state;
    return <form onSubmit={dispatcherP(user,action)}>
        <Errors list={errors} />
        <Input label='Email' value={email}
            onChange={dispatcherV(user, 'changeEmail')} />
        <Input type='password' label='Password'
            value={password}
            onChange={dispatcherV(user, 'changePassword')} />
        <SubmitButton disabled={loading}>
            {loading ? 'Loading...' : button}
        </SubmitButton>
    </form>;
}
