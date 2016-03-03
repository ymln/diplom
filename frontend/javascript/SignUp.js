import React from 'react';

import Page from './Page';
import SignUpForm from './SignUpForm';

export default function SignUp({store}) {
    return <Page store={store}>
        <SignUpForm store={store} />
    </Page>;
}
