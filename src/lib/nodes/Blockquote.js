import React from 'react';

const style = {
  borderLeft: '0.25em solid #e6e6e6',
  padding: '0 1em',
  color: '#6a737d'
};

class Blockquote extends React.Component {
  render() {
    return (
      <div {...this.props.attributes} style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default Blockquote;