import React from 'react';

import Page from './Page';
import LoginForm from './LoginForm';

export default function Login({store}) {
    if(store.user.token) {
        store.router.changeRoute('main');
    }
    return <Page store={store}>
        <LoginForm store={store} />
    </Page>;
}
