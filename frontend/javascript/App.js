import React from 'react';

export default class App extends React.Component {
    render() {
        let {store} = this.props;
        let el = store.router.component();
        return React.createElement(el, {store});
    }
}
