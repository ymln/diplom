import React from 'react';

import {randomId} from './utils';

export default function Input({label, onChange, type}) {
    let id = randomId();
    return <div className='form-group'>
        <label htmlFor={id}>
            {label}
        </label>
        <input id={id} type={type || 'text'}
            className='form-control' onChange={onChange} />
    </div>;
}
