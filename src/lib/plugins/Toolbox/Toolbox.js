import React from 'react';
import FaImage from 'react-icons/lib/fa/image';
import FaVideo from 'react-icons/lib/fa/video-camera';
import FaTable from 'react-icons/lib/fa/table'
import Modal from 'react-modal';
import Dropzone from 'react-dropzone'

class Toolbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      modalIsOpen: false
    }
  }

  toggleHover = (flag) => {
    this.setState({hover: flag})
  }

  insertImage = () => {
    this.uploadInput.click();
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  onDrop = (files) => {
    console.log(this.props)
    this.props.node.value.change().setBlocks('image')
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

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <div style={{position: 'relative'}} onMouseEnter={this.toggleHover.bind(this, true)} onMouseLeave={this.toggleHover.bind(this, false)}>
        {this.props.children}
        <div style={style}>
          <a style={{marginRight: '20px', cursor: 'pointer'}} onClick={this.openModal}><FaImage/></a>
          <FaVideo style={{marginRight: '20px'}}/>
          <FaTable/>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section>
            <div className="dropzone">
              <Dropzone onDrop={this.onDrop}>
                <div style={{textAlign: 'center', paddingTop: '40px'}}>
                <FaImage style={{fontSize: '100px', color: '#eee'}}/>
                </div>
              </Dropzone>
            </div>
            <aside>
              <p>拖拽或者点击上传图片</p>
            </aside>
          </section>

        </Modal>
      </div>
    )
  }
}

export default Toolbox;