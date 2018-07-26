import React from 'react';

const style = {
  background: '#f7f7f7',
  border: '1px solid #e6e6e6',
  minHeight: '40px',
  padding: '10px 4px',
  counterReset: 'line',
  margin: '16px 0',
  position: 'relative'
};

class CodeBlock extends React.Component {
  render() {
    return (
      <pre {...this.props.attributes} style={style}>
        {this.props.children}
        {this.props.editor.props.readOnly ?
          null
          :
          <div style={{position: 'absolute', bottom: 0, right: 5, opacity: '.5'}}>按CMD/CTRL+ENTER退出编辑</div>
        }
        <div contentEditable={false} style={{position: 'absolute', top: 0, right: 5, opacity: '.5'}}><i className='iconfont' style={{cursor: 'pointer'}} onClick={this.props.editor.props.codeBlockConfig.fly.bind(this, this.props.children)}>&#xe74c;</i></div>
      </pre>
    )
  }
}

export default CodeBlock;