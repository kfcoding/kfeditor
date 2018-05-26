import React from 'react';

export default (options) => {
    return {
        renderNode: (props) => {
            if (props.node.type === 'h2')
                return <h2>{props.children}</h2>;
        },
    };
};