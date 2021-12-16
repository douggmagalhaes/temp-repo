import "./styles.css";

import { Component } from "react";

export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <button className="btnPage" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}
