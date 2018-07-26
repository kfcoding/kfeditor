import React from 'react';
import FaImage from 'react-icons/lib/fa/image';
import FaTable from 'react-icons/lib/fa/table';
import FaOl from 'react-icons/lib/fa/list-ol';
import FaUl from 'react-icons/lib/fa/list-ul';
import FaCode from 'react-icons/lib/fa/code';
import FaBlockquote from 'react-icons/lib/fa/quote-right';
import FaCheckbox from 'react-icons/lib/fa/calendar-check-o';
import Modal from 'react-modal';
import PluginEditCode from 'slate-edit-code';
import styled from 'styled-components';
import {Data} from 'slate';
import EditList from 'slate-edit-list';
import EditBlockquote from 'slate-edit-blockquote';

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

const CodeblockContainer = styled.div`
  position: relative;
`

const CodeblockLang = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  font-size: 14px;
  padding: 4px;
  background-color: #EEE;
  color: #555;
  border-radius: 3px;
  text-transform: uppercase;
`

class Toolset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.codePlugin = PluginEditCode({
      onlyIn: node => node.type === 'code_block'
    });
  }

  test = () => {
    let cg = this.props.value.change().setBlocks('code')
    this.props.onChange(cg)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  insertCode = () => {
    let newChange = this.props.value.change().setBlocks({data: Data.create({['syntax']: 'javascript'})});
    this.props.onChange(this.codePlugin.changes.wrapCodeBlock(newChange).focus());
    return;
  }

  insertUl = () => {
    let cg = EditList().changes.wrapInList(this.props.value.change()).focus();
    this.props.onChange(cg);
  }

  insertOl = () => {
    let cg = EditList().changes.wrapInList(this.props.value.change(), 'ol_list').focus();
    this.props.onChange(cg);
  }

  insertQuote = () => {
    let cg = EditBlockquote().changes.wrapInBlockquote(this.props.value.change()).focus();
    this.props.onChange(cg);
  }

  render() {
    return (
      <div style={{top: this.props.top + 'px', position: 'absolute', left: '170px', zIndex: 1, opacity: '0.55', fontSize: '20px'}}>
        <FaImage onClick={this.openModal} style={{marginRight: '20px'}}/>
        <FaTable style={{marginRight: '20px'}}/>
        <FaOl style={{marginRight: '20px'}} onClick={this.insertOl}/>
        <FaUl style={{marginRight: '20px'}} onClick={this.insertUl}/>
        <FaCode style={{marginRight: '20px'}} onClick={this.insertCode}/>
        <FaBlockquote style={{marginRight: '20px'}} onClick={this.insertQuote}/>
        <FaCheckbox style={{marginRight: '20px'}}/>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Toolset;