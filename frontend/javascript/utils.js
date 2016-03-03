export function dispatcher(store, method, ...args) {
    return (...args2) => store[method].apply(store, [...args, ...args2]);
}

export function dispatcherV(store, method, ...args) {
    return (e) => store[method].apply(store, [...args, e.target.value]);
}

export function dispatcherP(store, method, ...args) {
    return (e) => {
        e.preventDefault();
        store[method].apply(store, [...args, e]);
    };
}

export function randomId() {
    return 'id-' + Math.random().toString(36).substring(2);
}
