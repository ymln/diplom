import React from 'react';

import Page from './Page';
import LoginForm from './LoginForm';

export default function Main({store}) {
    return <Page store={store}>
        <p>Welcome to our system!</p>
    </Page>;
}
