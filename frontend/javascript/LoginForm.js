import React from 'react';

import UserForm from './UserForm';

export default function LoginForm({store}) {
    return <UserForm store={store} action='login' button='Log in' />;
}
