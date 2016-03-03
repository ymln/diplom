import React from 'react';

export default function Errors({list}) {
    return <div>
        {list.map((val, i) => <div key={i} className='alert alert-danger'>{val}</div>)}
    </div>;
}
