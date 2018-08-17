import React from 'react';
import { Modal, Button, Form, Select } from 'antd';
import { languages } from 'prismjs/components.json';

class LangForm extends React.Component {

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  componentDidMount(){
    this.props.formRef(this);
  }

  reset = () => {
    this.props.form.resetFields();
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    const Option = Select.Option;
    
    return (
      <Form horizontal="true">
        <FormItem
          label="Code language"
          hasFeedback
        >
          {getFieldDecorator('lang')(
            <Select placeholder="Select a language (optional)" onChange={this.handleChange}>
              {Object.keys(languages)
                .filter(lang => {
                  return languages[lang].title;
                })
                .map(lang => {
                  return (
                    <Option value={lang} key={lang}>
                      {languages[lang].title}
                    </Option>
                  )
                })
              }
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

const WrappedLangForm = Form.create()(LangForm);

class CodeLanguageModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.codeLangModalVisible,
      title: 'Create code block'
    };
  }
  
  componentWillReceiveProps(nextProps) {

    this.setState({
      visible: nextProps.visible,
    })
  }

  formRef = (ref) => {
    this.child = ref;
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => {
    this.child.reset();
    this.props.close();
  }

  handleOk = (e) => {
    e.preventDefault();
    const that = this;

    this.child.props.form.validateFields((err, values) => {
      if (!err) {
        const { lang } = values;
        this.props.make(lang);
        that.handleCancel();
      }
    });
  }

  render() {
    return (
      <Modal
        title={this.state.title}
        onCancel={this.handleCancel}
        visible={this.state.visible}
        footer={[
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>
            Cancel
            </Button>,
          <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
            Ok
            </Button>
        ]}
      >
        <WrappedLangForm formRef={this.formRef} />
      </Modal>
    )
  }

}

export default CodeLanguageModal;