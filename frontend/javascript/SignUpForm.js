import React from 'react';

import UserForm from './UserForm';

export default function SignUpForm({store}) {
    return <UserForm store={store} action='signup' button='Sign up' />;
}
