import React, { Component } from "react";
import { Editor } from 'slate-react';
import {Value} from 'slate';
import H1 from './plugins/Headers/H1';
import H2 from './plugins/Headers/H2';
import H3 from './plugins/Headers/H3';
import CodeBlock from './plugins/CodeBlock/CodeBlock';
import Toolbox from './plugins/Toolbox';
import AutoReplace from 'slate-auto-replace'
import DropOrPasteImages from 'slate-drop-or-paste-images'
import Image from './nodes/Image';

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
  CodeBlock(),
  Toolbox(),
  AutoReplace({
    trigger: 'space',
    before: /^(#{1,6})$/,
    transform: (transform, event, matches) => {
      const [ hashes ] = matches.before
      const level = hashes.length
      return transform.setBlock({
        type: 'h',
        data: { level }
      })
    }
  }),
  AutoReplace({
    trigger: 'enter',
    before: /^(-{3})$/,
    transform: (transform) => {
      return transform.setBlock({
        type: 'hr',
        isVoid: true
      })
    }
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(>)$/,
    transform: transform => transform.setBlock('blockquote')
  }),
  AutoReplace({
    trigger: 'space',
    before: /^(-)$/,
    transform: transform => transform.setBlock('li').wrapBlock('ul')
  }),
  DropOrPasteImages({
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file },
      })
    }
  })
];

function renderNode(props) {
  const { node, attributes, children } = props
  switch (node.type) {
    case 'blockquote':
      let style = {
        padding: '0 1em',
        color: '#6a737d',
        borderLeft: '0.25em solid #dfe2e5',
        marginLeft: 0
      };
      return <blockquote {...attributes} style={style}><p>{children}</p></blockquote>
    case 'hr':
      return <hr />
    case 'ul':
      return <ul {...attributes}>{children}</ul>
    case 'li':
      return <li {...attributes}>{children}</li>
    case 'h':
      const level = node.data.get('level')
      const Tag = `h${level}`
      return <Tag {...attributes}>{children}</Tag>
    case 'image':
      return <Image {...props} />
  }
}

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
      <div style={{padding: '40px', position: 'relative'}}>
        <Editor
          value={value}
          placeholder='请开始你的表演！'
          onChange={this.onChange}
          plugins={plugins}
          renderNode={renderNode}
        />
      </div>
    );
  }
}

export default Kfeditor;
