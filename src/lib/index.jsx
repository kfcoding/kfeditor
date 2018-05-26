import React, { Component } from "react";
import { Editor } from 'slate-react';
import {Value} from 'slate';
import HotMarkdown from './plugins/HotMarkdown';
import H1 from './plugins/Headers/H1';
import H2 from './plugins/Headers/H2';
import H3 from './plugins/Headers/H3';
import Blockquote from './plugins/Blockquote/Blockquote';
import CodeBlock from './plugins/CodeBlock/CodeBlock';
import Tool from './tool';
import Toolbox from './plugins/Toolbox';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'toolbox',
        nodes: [
          {
            object: 'text',
            leaves: [

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
  CodeBlock(),
  Toolbox()
];

class Kfeditor extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value })
    console.log(value.toJSON())
  }

  toggleTool = (show) => {
    this.setState({showTool: show})
  }

  render() {
    let {value} = this.state;

    return (
      <div style={{padding: '40px', position: 'relative'}}>
        <Editor
          value={value}
          placeholder='请开始你的表演！'
          onChange={this.onChange}
          plugins={plugins}
          toggleTool={this.toggleTool}
        />
      </div>
    );
  }
}

export default Kfeditor;
