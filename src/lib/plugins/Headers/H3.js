import React from 'react';

export default (options) => {
    return {
        renderNode: (props) => {
            if (props.node.type === 'h3')
                return <h3>{props.children}</h3>;
        },
    };
};