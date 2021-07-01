import React, { useEffect } from 'react';

function Alert({ msg, type, removeALert, tasks }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeALert();
        }, 2000);
        return () => clearTimeout(timeout);
    }, [tasks]);
    
    return (
        <h2 className={ `alert alert-${type}` }>{ msg }</h2>
    );
}

export default Alert
