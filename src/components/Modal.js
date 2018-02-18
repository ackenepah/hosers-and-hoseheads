import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import '../css/modal.css';

class Modal extends React.Component {

  bgClick(e){
    if(e.target === e.currentTarget){
      return this.props.close();
    }
  }

  render(){
    // console.log(this.props, 'this.props');

    const closeBtn = this.props.showClose ? <button onClick={this.props.close}> Close </button> : '';

    if(this.props.isOpen === true) {
      return (
        <ReactCSSTransitionGroup
          transitionName="modal-anim"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >

          <div className="modal-bg" onClick={this.bgClick.bind(this)}>
            <div className="modal">
              {this.props.children}
              {closeBtn}
            </div>
          </div>

        </ReactCSSTransitionGroup>
      )
    } else {
      return <ReactCSSTransitionGroup
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                transitionName="modal-anim"
            />;
    }
  }
}

export default Modal;
