import React from 'react';
import FaImage from 'react-icons/lib/fa/image';
import FaVideo from 'react-icons/lib/fa/video-camera';
import FaTable from 'react-icons/lib/fa/table'

class Toolbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }

  render() {
    let style = {
      padding: '2px 5px',
      background: '#fff',
      opacity: '0.5',
      display: 'inline-block',
      fontSize: '18px',
      borderBottomLeftRadius: '3px',
      borderBottomRightRadius: '3px',
      borderTopLeftRadius: '3px',
      borderTopRightRadius: '3px',
      position: 'absolute',
      top: '-5px',
      left: '130px'
    };
    if (this.state.hover) {
      style.display = 'block';
    } else {
      style.display = 'none';
    }
    return (
      <div style={{position: 'relative'}} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        {this.props.children}
        <div style={style}>
          <FaImage style={{marginRight: '20px'}}/>
          <FaVideo style={{marginRight: '20px'}}/>
          <FaTable/>
        </div>
      </div>
    )
  }
}

export default Toolbox;