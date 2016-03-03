import {dispatcherP} from './utils';
import React from 'react';

import Page from './Page';

export default function NotFound({store}) {
    return <Page store={store}>
        <p>404 <a onClick={dispatcherP(store.router, 'changeRoute', '')}>main page</a></p>
    </Page>;
}
