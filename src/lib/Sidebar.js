import React from 'react';
import {findDOMNode} from 'slate-react';
import FaPlus from 'react-icons/lib/fa/plus';
import FaHeader from 'react-icons/lib/fa/header'
import {Popover, Menu, Dropdown} from 'antd';
import EditList from 'slate-edit-list';


const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {
  constructor() {
    super();
    this.tp = React.createRef();
  }

  componentDidUpdate() {
    let {value} = this.props;
      //let rect = findDOMNode(value.document.getFurthestAncestor(this.props.currentBlock.key)).getBoundingClientRect();
      //this.tp.style.top = rect.top - 40 + 'px'

  }

  makeH1 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h1').focus();
    this.props.onChange(cg)
  }

  makeH2 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h2').focus();
    this.props.onChange(cg)
  }

  makeH3 = () => {
    let {value} = this.props;
    let cg = value.change().setBlocks('h3').focus();
    this.props.onChange(cg)
  }

  makeUl = () => {
    let {value} = this.props;
    let cg = EditList().changes.wrapInList(value.change(), 'ul_list').focus();
    this.props.onChange(cg)
  }

  makeOl = () => {
    let {value} = this.props;
    let cg = EditList().changes.wrapInList(value.change(), 'ol_list').focus();
    this.props.onChange(cg)
  }

  render() {
    let {value} = this.props;
    // if (this.props.currentBlock)
    //   console.log('c', findDOMNode(this.props.value).getBoundingClientRect())

    let rect = {top: 0}

    if (this.props.currentBlock && value.document.getFurthestAncestor(this.props.currentBlock.key)) {
      //console.log(value.document.getFurthestAncestor(this.props.currentBlock.key))
      rect = findDOMNode(value.document.getFurthestAncestor(this.props.currentBlock.key)).getBoundingClientRect();

      //if (this.props.currentBlock.getParent(this.props.currentBlock.key))
    }
    //console.log(rect)
    const content = (
        <Menu>
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
          <Menu.Divider></Menu.Divider>
          <SubMenu key="sub1" title={<span><span>nav</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
    );
    const styles = {
      transform: `translateY(${rect.top - 40}px)`,
      top: 0,
      height: rect.height,
      position: 'absolute',
      borderRight: '2px solid #2962cc',
      transition: 'transform .15s',
      paddingRight: '10px',
      fontSize: '18px',
      lineHeight: '18px',
      cursor: 'pointer'
    };
    return (
      <div style={{flex: '0 0 50px', position: 'relative'}}>
        <div ref={ node => this.props.sidebarIcon = node} style={styles}>
          <Dropdown overlay={content} trigger='click'>
            <FaPlus/>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Sidebar;