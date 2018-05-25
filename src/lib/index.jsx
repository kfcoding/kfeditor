import React, { Component } from "react";
import { Editor } from 'slate-react';
import {Value} from 'slate';
import HotMarkdown from './plugins/HotMarkdown';
import H1 from './plugins/Headers/H1';


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

const plugins = [
  HotMarkdown(),
  H1()
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
