import React from 'react';
import styled from 'react-emotion';
import ReactDOM from 'react-dom';
import '../style.css';

// To do : 这里的 prps.resorved 应该就是是否已经高亮的地方，需要看一下为什么没有正常工作

const Button = styled('span')`
  cursor: pointer;
  color: ${props =>
    props.reversed
      ? props.active ? 'white' : '#aaa'
      : props.active ? 'black' : '#ccc'};
`

const Icon = styled(({ className, ...rest }) => {
  switch (rest.children) {
    case 'bold':
      return <i className='iconfont' > &#xe605; </i>;
    case 'italic':
      return <i className='iconfont' > &#xe693; </i>;
    case 'underlined':
      return <i className='iconfont' > &#xe833; </i>;
    case 'code':
      return <i className='iconfont' > &#xe981; </i>;
    default:
      return null;
}})`
  font-size: 18px;
  vertical-align: text-bottom;
`

const Menu = styled('div')`
  & > * {
    display: inline-block;
  }

  & > * + * {
    margin-left: 15px;
  }
`

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
`

const StyledMenu = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`

class HoverMenu extends React.Component {

  render() {
    const { className, innerRef } = this.props
    const app = window.document.getElementById('app')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'bold')}
        {this.renderMarkButton('italic', 'italic')}
        {this.renderMarkButton('underlined', 'underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
      app
    )
  }

  //To Do : 看看这里到底为啥导致值没有正常传入
  renderMarkButton(type, icon) {
    const { value } = this.props

    const isActive = value.activeMarks.some(mark => mark.type == type)
    console.log(isActive);
    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  onClickMark(event, type) {
    const { value, onChange } = this.props
    event.preventDefault()
    this.props.make(type);
  }
}


export default HoverMenu