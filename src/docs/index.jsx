import React from "react";
import { render } from "react-dom";
import Kfeditor from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div style={{width: '1000px', height: '800px', margin: '0 auto', background: '#fff'}}>
      <Kfeditor/>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
