import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class Greeting extends React.Component {
    render() {
        return <div>Hello { this.props.name }!</div>;
    }
}

function mapStateToProps(state) {
    return { name: state.name };
}

@connect(mapStateToProps)
class App extends React.Component {
    render() {
        return <Greeting name={ this.props.name }/>;
    }
}

function dispatcher(state = { name: "test" }, action) {
    return state;
}

let store = createStore(dispatcher);

React.render(
    <Provider store={ store }>{ () => <App/> }</Provider>,
    document.getElementById('app')
);
