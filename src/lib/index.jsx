import React, { Component } from "react";
import { Editor } from 'slate-react';
import {Value} from 'slate';
import HotMarkdown from './plugins/HotMarkdown';
import H1 from './plugins/Headers/H1';
import H2 from './plugins/Headers/H2';
import H3 from './plugins/Headers/H3';
import Blockquote from './plugins/Blockquote/Blockquote';
import CodeBlock from './plugins/CodeBlock/CodeBlock';


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

/*const options = Object.assign(
  {
    markdownOption: {
      blocks: Object.assign(BLOCKS, opt.blocks),
      marks: Object.assign(MARKS, opt.marks),
      inlines: Object.assign(INLINES, opt.inlines)
    },
  }
)*/

const plugins = [
  HotMarkdown(),
  H1(),
  H2(),
  H3(),
  Blockquote(),
  CodeBlock()
];

class Kfeditor extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value })
    console.log(value.toJSON())
  }

  render() {
    let {value} = this.state;
    return (
      <div style={{padding: '40px'}}>
        <Editor
          value={value}
          onChange={this.onChange}
          plugins={plugins}
        />

      </div>
    );
  }
}

export default Kfeditor;
