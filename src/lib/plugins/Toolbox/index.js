import React from 'react';
import Toolbox from "./Toolbox";

export default (options) => {
  return {
    renderNode: (props) => {
      if (props.node.type === 'toolbox') {

        return (
          <Toolbox {...props}/>
        );
      }
    }
  }
};