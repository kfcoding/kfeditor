import React from 'react';

export default (options) => {

    return {
        renderNode: (props) => {
            const blockquoteStyle = {
                padding: '0 1em',
                color: '#6a737d',
                borderLeft: '0.25em solid #dfe2e5'
            }
            if (props.node.type == 'blockquote')
                return (<blockquote style={blockquoteStyle}>{props.children}</blockquote>);
        },

    };
};