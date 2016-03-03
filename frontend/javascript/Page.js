import React from 'react';

import {dispatcherP} from './utils';

function Link({href, children, router, className}) {
    return <a onClick={dispatcherP(router, 'changeRoute', href)}
        className={className}>
        {children}
    </a>;
}

function Menu({menu, router}) {
    let items = [];
    for(let key of Object.keys(menu)) {
        let val = menu[key];
        items.push(<li key={key}>
            <Link router={router} href={key}>{val}</Link>
        </li>);
    }
    return <ul className='nav navbar-nav navbar-right'>
        {items}
    </ul>;
}

function Header({menu, router}) {
    return <header className='navbar navbar-default container-fluid'>
        <div className='navbar-header'>
            <button type='button'
                className='navbar-toggle collapsed'
                data-toggle='collapse'
                data-target='#header-navbar-collapse'
                aria-expanded='false'>
                <span className='sr-only'>
                    Toggle navigation
                </span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' router={router} href=''>
                Brand
            </Link>
        </div>

        <div className='collapse navbar-collapse'
            id='header-navbar-collapse'>
            <Menu menu={menu} router={router} />
        </div>
    </header>;
}

function Footer() {
    return <footer></footer>;
}

export default function Page({children, store}) {
    let menu = store.state.menu;
    let router = store.router;
    return <div className='container-fluid'>
        <Header menu={menu} router={router} />
        {children}
        <Footer />
    </div>;
}
