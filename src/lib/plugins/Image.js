import React from 'react';
import { Modal, Icon, Upload} from 'antd';

const Dragger = Upload.Dragger;

class ImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.imageModalVisible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    })
  }

  handleOk = (e) => {
    this.handleCancel();
  }

  handleCancel = (e) => {
    this.props.close();
  }

  render(){
    return (
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
    )
  }

}

export default ImageModal;   