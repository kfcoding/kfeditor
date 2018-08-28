import React from "react";
import { render } from "react-dom";
import "./styles.css";
import Kfeditor from "../lib";
import { Value } from 'slate';

const initialValue = ({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{
              text: ''
            }],
          },
        ],
      },
    ],
  },
});

const app = document.getElementById("app");

class Demo extends React.Component {
  state = {
    value: Value.fromJSON(initialValue)
  }

  onChange = ({value}) => {
    this.setState({value})
  }

  render() {
    return (
      <div style={{
        width: '1000px',
        height: '800px',
        margin: '0 auto',
        background: '#fff',
        position: 'relative',
        zIndex: 0
      }}>
        <Kfeditor editorAnchor = {app} value={this.state.value} onChange={this.onChange} codeBlockConfig={{
          fly: (v) => {
            let str = "";
            v.map(itr => {
              str += itr.props.node.text + '\n'
            });
            console.log(str)
          }
        }}/>
      </div>
    );
  }
}

render(<Demo/>, app);
