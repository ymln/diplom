import React from 'react';

import {dispatcher} from './utils';

export default function SubmitButton({onSubmit, children, disabled}) {
    let cls = 'btn btn-default';
    if(disabled)
        cls += ' disabled';
    return <button type='submit'
        disabled={disabled} className={cls}>
        {children}
    </button>;
}
