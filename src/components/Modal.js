import React from 'react';

class Modal extends React.Component {

  render(){
    console.log(this.props, 'this.props');

    if(this.props.isOpen === true) {
      return (
        <div className="modal">
          {this.props.children}
          <button onClick={this.props.close}>Close</button>
        </div>
      )
    } else {
      return null
    }


  }
}

export default Modal;
