import React from 'react';

export default (options) => {
  return {
    renderNode: (props) => {
      if (props.node.type === 'h1')
        return <h1>{props.children}</h1>;
    },
  };
};