import React from 'react';
import styled from 'styled-components';

export default (options) => {
  return {
    renderNode: (props) => {
      const CodeBlockContainer = styled.div`
         position: relative;
      `
      const CodeBlockLang = styled.div`
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: 14px;
        padding: 4px;
        background-color: #EEE;
        color: #555;
        border-radius: 3px;
        text-transform: uppercase;
       `


      if(props.node.type == 'code_block'){
        const syntax = options.getSyntax(node);
        return (
          <CodeBlockContainer>
            <CodeBlockLang contentEditable={false}>{syntax || 'TXT'}</CodeBlockLang>
            <pre>
              <code {...props.attributes}>
                {props.children}
              </code>
            </pre>
          </CodeBlockContainer>
        );
      }else if(props.node.type == 'code_line'){
        return <div {...props.attributes}>{props.children}</div>;
      }
    },

  };
};