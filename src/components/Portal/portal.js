import React, { Component } from "react";
import ReactDOM from "react-dom";

class BackDrop extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="backdrop" onClick={this.props.closePortal}></div>;
  }
}

class Portal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const backDropElement = document.getElementById("backdrop-root");
    const overlayElement = document.getElementById("overlay-root");
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <BackDrop closePortal={this.props.closePortal} />,
          backDropElement
        )}
        {ReactDOM.createPortal(this.props.component, overlayElement)}
      </React.Fragment>
    );
  }
}

export default Portal;
