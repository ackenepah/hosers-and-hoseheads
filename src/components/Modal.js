import React from 'react';
import '../css/modal.css';

class Modal extends React.Component {

  bgClick(e){
    if(this.props.showClose){
      if(e.target === e.currentTarget){
        return this.props.close();
      }  
    }

  }

  render(){
    console.log(this.props, 'this.props');

    const closeBtn = this.props.showClose ? <button onClick={this.props.close}> Close </button> : '';

    if(this.props.isOpen === true) {
      return (
        <div>
          <div className="modal-bg" onClick={this.bgClick.bind(this)}>
            <div className="modal">
              {this.props.children}
              {closeBtn}
            </div>
          </div>


        </div>

      )
    } else {
      return null
    }


  }
}

export default Modal;
