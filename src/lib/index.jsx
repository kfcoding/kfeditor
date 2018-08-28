import React, { Component } from "react";
import { Editor, findDOMNode } from 'slate-react';
import 'prismjs/themes/prism.css'
import 'normalize.css';
import './style.css';

// --------------------------- slate ---------------------------
import { Data } from 'slate';
import EditCode from 'slate-edit-code'
import EditPrism from 'slate-prism'
import EditBlockquote from 'slate-edit-blockquote';
import TrailingBlock from 'slate-trailing-block';
import EditTable from 'slate-edit-table';
import EditList from 'slate-edit-list';
import NoEmpty from 'slate-no-empty';
// import {MarkdownPlugin} from 'slate-md-editor';
// import AutoReplace from 'slate-auto-replace'

// --------------------------- nodes ---------------------------
import CodeBlock from './nodes/CodeBlock';
import { Table, TableRow, TableCell } from './nodes/Table';
import Paragraph from './nodes/Paragraph';
import Blockquote from "./nodes/Blockquote";

// --------------------------- plugins ---------------------------
import CodeLanguageModal from "./plugins/CodeLang"
import HoverMenu from "./plugins/HoverMenu";
import ImageModal from './plugins/Image';

// --------------------------- antd ---------------------------
import { Menu, Dropdown} from 'antd';

// ================================ PLUGINS ==================================
const QuotePlugin = EditBlockquote();
const ListPlugin = EditList();
const CodePlugin = EditCode({
  onlyIn: node => node.type === 'code_block'
});
const TablePlugin = EditTable({
  typeTable: 'table',
  typeRow: 'table_row',
  typeCell: 'table_cell',
  typeContent: 'paragraph'
});
const plugins = [
  // MarkdownPlugin({
  //   listOption: {
  //     types: ['ol_list', 'ul_list']
  //   }
  // }),
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
  NoEmpty('paragraph'),
  CodePlugin,
  TrailingBlock(),
  ListPlugin,
  QuotePlugin,
  TablePlugin
]

// ================================ RENDER ==================================

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
      return <Paragraph {...props} />;
    case 'ol_list':
      return <ol {...attributes}>{children}</ol>;
    case 'ul_list':
      return <ul {...attributes}>{children}</ul>;
    case 'list_item':
      return <li {...attributes}>{children}</li>;
    case 'h1':
    case 'header_one':
      return <h1 {...attributes}>{children}</h1>;
    case 'h2':
    case 'header_two':
      return <h2 {...attributes}>{children}</h2>;
    case 'h3':
    case 'header_three':
      return <h3 {...attributes}>{children}</h3>;
    case 'image':
      return <img {...attributes} src={node.data.get('src')}/>;
    case 'blockquote':
      return <Blockquote {...props}>{children}</Blockquote>
    case 'table':
      return <Table {...props} >{children}</Table>;
    case 'table_row':
      return <TableRow {...props} >{children}</TableRow>;
    case 'table_cell':
      return <TableCell {...props} >{children}</TableCell>;
    default:
      return null;
  }
}

function renderMark(props) {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code className='inlineCode' {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
  }
}

// ============================ EDITOR ================================

class Kfeditor extends Component {

  constructor(props) {
    super(props);
    this.containerNode = React.createRef();
    this.sidebarIcon = React.createRef();
    this.menu = React.createRef();
    this.editor = React.createRef();
  }

  state = {
    value: this.props.value,
    showToolset: false,
    toolsetTop: 0,
    currentBlock: null,
    visible: false,
    codeLangModalVisible: false,
    imageModalVisible: false
  };

  onChange = ({value}) => {
    this.props.onChange({value});
    return;

    this.setState({value});
    this.props.onContentChange ? this.props.onContentChange({value}) : null;
  }

  componentDidUpdate() {
    let {value} = this.props;
    if (!value.focusBlock)
      return;
    let rect = findDOMNode(value.document.getFurthestAncestor(value.focusBlock.key)).getBoundingClientRect();
    let crect = this.containerNode.getBoundingClientRect();
    this.sidebarIcon.style.height = rect.height + 'px';
    this.sidebarIcon.style.transform = `translateY(${rect.top - crect.top - 40}px)`;

    if (!this.menu) return
    if (value.isBlurred || value.isEmpty) {
      this.menu.removeAttribute('style');
      return
    }
    this.menu.style.opacity = 1;
    this.menu.style.top = `${rect.top + window.pageYOffset - this.menu.offsetHeight}px`;

    var text_range = window.getSelection().getRangeAt(0);
    var text_rect = text_range.getBoundingClientRect();
    this.menu.style.left = `${text_rect.left +
      text_rect.width / 2 - 
      this.menu.offsetWidth / 2}px`;
  }

  popCodeLangModal = () => {
    this.setState({
      codeLangModalVisible: true
    });
  }

  closeCodeLangModal = () => {
    this.setState({
      codeLangModalVisible: false
    });
  }

  popImageModal = () => {
    this.setState({
      imageModalVisible: true
    });
  }

  closeImageModal = () => {
    this.setState({
      imageModalVisible: false
    });
  }

  makeH1 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h1').focus();
    this.onChange(cg)
  }

  makeH2 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h2').focus();
    this.onChange(cg)
  }

  makeH3 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h3').focus();
    this.onChange(cg)
  }

  makeUl = () => {
    let {value} = this.props;
    let cg1 = ListPlugin.changes.wrapInList(value.change(), 'ul_list').focus();
    this.onChange(cg1)
  }

  makeOl = () => {
    let {value} = this.props;
    let cg = ListPlugin.changes.wrapInList(value.change(), 'ol_list').focus();
    this.onChange(cg)
  }

  makeCodeBlock = (lang) => {
    let {value} = this.props;
    let newChange = value.change().setBlocks({ data: Data.create({ ['syntax']: lang }) });
    console.log(lang);
    this.onChange(CodePlugin.changes.wrapCodeBlock(newChange).focus());
  }

  makeQuote = () => {
    let {value} = this.props;
    // fuck it!!! it not work in our project ,report error.
    // this.onChange(EditBlockquote().changes.wrapInBlockquote(value.change()).focus());
    // fuck off
    // update: this not work in npm link mode.

    let cg = value.change().setBlocks('blockquote');
    this.onChange(cg.focus());
  }

  makeMark = (type) => {
    let {value} = this.props;
    let cg = value.change().toggleMark(type)
    this.onChange(cg.focus());
  }

  makeTable = () => {
    this.editor.change(TablePlugin.changes.insertTable);
  }

  // insertImage = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // }

  // handleOk = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // }

  // handleCancel = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // }

  imageChange = (file) => {
    console.log(file)
    if (!file.file.response) {
      return;
    }
    let {value} = this.props;
    let cg = value.change().insertInline({
      type: 'image',
      isVoid: true,
      data: {
        src: file.file.response.data.link,
      }
    });
    this.onChange(cg);
    this.handleCancel()
  }

  render() {
    let {value, ...rest} = this.props;

    const styles = {
      top: 0,
      right: 5,
      position: 'absolute',
      borderRight: '1px solid #2962ff',
      transition: 'transform .15s',
      paddingRight: '10px',
      fontSize: '18px',
      lineHeight: '18px',
      cursor: 'pointer',
      display: this.props.readOnly ? 'none' : 'block'
    };

    const content = (
      <Menu style={{fontSize: '12px'}} className='sidebarMenu'>
        <Menu.Item onClick={this.makeH1}>
          <i className="iconfont">&#xe9fc;</i> 一级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeH2}>
          <i className='iconfont'>&#xe9fd;</i> 二级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeH3}>
          <i className='iconfont'>&#xe9fb;</i> 三级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeUl}>
          <i className='iconfont'>&#xe97a;</i> 无序列表
        </Menu.Item>
        <Menu.Item onClick={this.makeOl}>
          <i className='iconfont'>&#xe93c;</i> 有序列表
        </Menu.Item>
        <Menu.Item onClick={this.popCodeLangModal}>
          <i className='iconfont'>&#xe743;</i> 代码块
        </Menu.Item>
        <Menu.Item onClick={this.makeQuote}>
          <i className='iconfont'>&#xe600;</i> 引用
        </Menu.Item>
        <Menu.Item onClick={this.makeTable}>
          <i className='iconfont'>&#xe621;</i> 表格
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={this.popImageModal}>
          <i className='iconfont'>&#xe993;</i> 图片
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="editorWrapper" ref={node => this.containerNode = node} style={{padding: '40px 40px 0 0px', position: 'relative', display: 'flex', minHeight: 500}}>

        <div style={{flex: '0 0 40px', position: 'relative'}}>
          <div ref={ node => this.sidebarIcon = node} style={styles}>
            <Dropdown overlay={content} trigger={['click']}>
              <i className='iconfont' style={{ fontSize: '16px' }}>&#xe607;</i>
            </Dropdown>
          </div>
        </div>

        <div>
          <HoverMenu
            innerRef={menu => (this.menu = menu)}
            value={this.state.value}
            onChange={this.onChange}
            make = { (type) => this.makeMark(type)}
            editorAnchor={this.props.editorAnchor}
          />
        </div>

        <Editor
          ref={editor => this.editor = editor}
          value={value}
          onChange={this.props.onChange}
          plugins={plugins}
          style={{zIndex: 0, height: '100%', flex: '1 0 0'}}
          renderNode={renderNode}
          renderMark={renderMark}
          className='markdown-body'
          {...rest}
        />

        <CodeLanguageModal
          visible = {this.state.codeLangModalVisible}
          close = { () => this.closeCodeLangModal()}
          make = { (lang) => this.makeCodeBlock(lang)}
        />

        <ImageModal
          visible = {this.state.imageModalVisible}
          close = { () => this.closeImageModal()}
          imageOptions = {this.props.imageOptions}
          imageChange = { (file) => this.imageChange(file)}
        />

        {/* <Modal
          title="插入图片"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Dragger {...this.props.imageOptions} onChange={this.imageChange} showUploadList={false}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽图片到这里上传</p>
          </Dragger>
        </Modal> */}
      </div>
    );
  }
}

export default Kfeditor;
