import React from 'react';
import { Value } from "slate";
import EditCode from "slate-edit-code";
import { BlockquotePlugin } from "@canner/slate-icon-blockquote/lib/index";
import EditPrism from "slate-prism";
import { HeaderOnePlugin, HeaderThreePlugin, HeaderTwoPlugin } from "@canner/slate-icon-header/lib/index";
import { Editor, findDOMNode } from 'slate-react';
import TrailingBlock from 'slate-trailing-block';
import EditBlockquote from 'slate-edit-blockquote';
import { DEFAULT as DEFAULTBLOCKQUOTE } from '@canner/slate-helper-block-quote';
import { ParagraphPlugin } from '@canner/slate-icon-shared';
import EditList from 'slate-edit-list';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [],
          },
        ],
      },
    ],
  },
});

const codePlugin = EditCode({
  onlyIn: node => node.type === 'code_block'
});

const plugins = [
  //MarkdownPlugin(),
  // AutoReplace({
  //   trigger: 'space',
  //   before: /^(```)(.*)$/,
  //   transform: (transform, e, matches) => {console.log(matches)
  //     let newChange = transform.setBlocks({data: Data.create({['syntax']: matches.before[2]})});
  //     return codePlugin.changes.wrapCodeBlock(newChange).focus()
  //     //this.props.onChange(this.codePlugin.changes.wrapCodeBlock(newChange).focus());
  //     return transform.setBlock({ type: 'code_block' })
  //   }
  // }),
  EditPrism({
    onlyIn: node => node.type === 'code_block',
    getSyntax: node => node.data.get('syntax')
  }),
  EditCode({
    onlyIn: node => node.type === 'code_block'
  }),
  TrailingBlock({type: 'paragraph'}),
  EditBlockquote(DEFAULTBLOCKQUOTE),
  ParagraphPlugin(),
  HeaderOnePlugin(),
  HeaderTwoPlugin(),
  HeaderThreePlugin(),
  BlockquotePlugin(),
  EditList(),

]

function renderNode(props) {
  const {node, children, attributes} = props;

  switch (node.type) {
    case 'code_block':
      return (
        <CodeBlock {...props}>{children}</CodeBlock>
      );
    case 'code_line':
      return <div className='codeLine' {...attributes} style={{margin: '0'}}>{children}</div>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'ol_list':
      return <ol {...attributes}>{children}</ol>;
    case 'ul_list':
      return <ul {...attributes}>{children}</ul>
    case 'list_item':
      return <li {...attributes}>{children}</li>;
    case 'h1':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
      return <h3 {...attributes}>{children}</h3>;
    default:
      return null;
  }
}

class EditorWrapper extends React.Component {
  state = {
    value: initialValue,
    showToolset: false,
    toolsetTop: 0,
    currentBlock: null
  };

  componentDidUpdate() {
    //this.props.setCurrentBlock(this.props.value.focusBlock)
  }

  onChange = ({value}) => {
    this.props.onChange({value}, () => {

      //this.setState({currentBlock: this.state.value.focusBlock})
      return;
      const {value} = this.state;
      const {texts, focusBlock, startBlock} = value;
      const currentTextNode = texts.get(0);
      if (!currentTextNode) return;
      const currentLineText = currentTextNode.text;
      if (focusBlock)
        if ((currentLineText.length !== 0 || focusBlock.type !== 'paragraph')) {
          this.setState({showToolset: false});
          return;
        }

      const rect = getVisibleSelectionRect();
      if (!rect) {
        //this.setState({showToolset: false})
        return;
      }

      const containerBound = this.containerNode.getBoundingClientRect();

      const top = rect.top - containerBound.top - 5;
      this.setState({toolsetTop: top, showToolset: true})
    })
    console.log(value.toJSON())
  }

  render() {
    let {value} = this.props;
    return (
      <Editor
        value={value}
        onChange={this.props.onChange}
        plugins={plugins}
        style={{zIndex: 0, height: '100%', flex: '1 0 0'}}
        placeholder='请开始你的表演！'
        renderNode={renderNode}
        className='markdown-body'
      />
    );
  }
}

export default EditorWrapper;