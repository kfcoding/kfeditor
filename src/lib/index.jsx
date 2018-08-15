import React, { Component } from "react";
import { Editor, findDOMNode } from 'slate-react';
import { Data } from 'slate';
import EditCode from 'slate-edit-code'
import EditPrism from 'slate-prism'
import CodeBlock from "./nodes/CodeBlock";
import CodeLanguageModal from "./plugins/CodeLang"
import 'prismjs/themes/prism.css'
import 'normalize.css';
import './style.css';
// import {MarkdownPlugin} from 'slate-md-editor';
// import AutoReplace from 'slate-auto-replace'
import EditBlockquote from 'slate-edit-blockquote';
import TrailingBlock from 'slate-trailing-block';
import EditTable from 'slate-edit-table';
import EditList from 'slate-edit-list';
import NoEmpty from 'slate-no-empty';
import {Menu, Dropdown, Modal, Icon, Upload} from 'antd';
import Blockquote from "./nodes/Blockquote";

const SubMenu = Menu.SubMenu;
const Dragger = Upload.Dragger;

const QuotePlugin = EditBlockquote();
const CodePlugin = EditCode({
  onlyIn: node => node.type === 'code_block'
});
const ListPlugin = EditList();
const TablePlugin = EditTable();
const plugins = [
  // MarkdownPlugin({
  //   listOption: {
  //     types: ['ol_list', 'ul_list']
  //   }
  // }),
  NoEmpty('paragraph'),
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
  CodePlugin,
  TrailingBlock(),
  ListPlugin,
  QuotePlugin
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
    default:
      return null;
  }
}

class Kfeditor extends Component {
  state = {
    value: this.props.value,
    showToolset: false,
    toolsetTop: 0,
    currentBlock: null,
    visible: false,
    codeLangModalVisible: false
  };

  containerNode = React.createRef();

  sidebarIcon = React.createRef();

  onChange = ({value}) => {
    this.props.onChange({value});
    return;

    this.setState({value});
    this.props.onContentChange ? this.props.onContentChange({value}) : null;
    console.log(value.toJSON())
  }

  componentDidUpdate() {
    let {value} = this.props;
    if (!value.focusBlock)
      return;
    let rect = findDOMNode(value.document.getFurthestAncestor(value.focusBlock.key)).getBoundingClientRect();
    let crect = this.containerNode.getBoundingClientRect();
    this.sidebarIcon.style.height = rect.height + 'px';
    this.sidebarIcon.style.transform = `translateY(${rect.top - crect.top - 40}px)`;
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

  insertImage = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

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
          <i className="iconfont">&#xe75b;</i> 一级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeH2}>
          <i className='iconfont'>&#xe75c;</i> 二级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeH3}>
          <i className='iconfont'>&#xe862;</i> 三级标题
        </Menu.Item>
        <Menu.Item onClick={this.makeUl}>
          <i className='iconfont'>&#xe695;</i> 无序列表
        </Menu.Item>
        <Menu.Item onClick={this.makeOl}>
          <i className='iconfont'>&#xe76b;</i> 有序列表
        </Menu.Item>
        <Menu.Item onClick={this.popCodeLangModal}>
          <i className='iconfont'>&#xeb9f;</i> 代码块
        </Menu.Item>
        <Menu.Item onClick={this.makeQuote}>
          <i className='iconfont'>&#xe6b2;</i> 引用
        </Menu.Item>
        <Menu.Divider></Menu.Divider>
        <Menu.Item onClick={this.insertImage}>
          <i className='iconfont'>&#xe7bc;</i> 图片
        </Menu.Item>
      </Menu>
    );

    return (
      <div ref={node => this.containerNode = node} style={{padding: '40px 40px 0 0px', position: 'relative', display: 'flex', minHeight: 500}}>

        <div style={{flex: '0 0 40px', position: 'relative'}}>
          <div ref={ node => this.sidebarIcon = node} style={styles}>
            <Dropdown overlay={content} trigger={['click']}>
              <i className='iconfont' style={{fontSize: '16px'}}>&#xe774;</i>
            </Dropdown>
          </div>
        </div>

        <Editor
          value={value}
          onChange={this.props.onChange}
          plugins={plugins}
          style={{zIndex: 0, height: '100%', flex: '1 0 0'}}
          renderNode={renderNode}
          className='markdown-body'
          {...rest}
        />

        <CodeLanguageModal
          visible = {this.state.codeLangModalVisible}
          close = { () => this.closeCodeLangModal()}
          make = { (lang) => this.makeCodeBlock(lang)}
        />

        <Modal
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
        </Modal>
      </div>
    );
  }
}

export default Kfeditor;
