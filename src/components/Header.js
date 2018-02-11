import React from 'react';
import { Link } from 'react-router';
import logo from '../img/logo.png';

class Header extends React.Component {

  constructor(){
    super();

    this.state = {
      popupOpen: false
    }

    this.togglePopup = this.togglePopup.bind(this);
  }


  togglePopup(e){
    console.log('popup fired');
    if(e && (e.target.nodeName === 'FORM' || e.target.nodeName === 'INPUT' || e.target.nodeName === 'BUTTON')){
      console.log('not closing');
    } else {
      this.setState({popupOpen: !this.state.popupOpen})
    }
  }

  adminDashboard(){
    console.log(this.state.popupOpen, 'popup');
    let popupStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center'
    }

    const formStyle = {
      'zIndex': 100,
      background: 'pink',
      position: 'absolute'
    }

    popupStyle.display = this.state.popupOpen === true ? popupStyle.display = 'flex' : 'none';

    if(this.props.admin.loggedIn){
      return (
        <div className="admin-dashboard">
          <div className="admin-settings">
            <Link to="/admin">
              <img src="http://placehold.it/50x50" alt="User" />
              <span>Welcome, {this.props.admin.adminUser.displayName ? this.props.admin.adminUser.displayName : this.props.admin.adminUser.email}</span>
            </Link>
            <p style={{color: 'white'}} onClick={()=>{this.togglePopup()}}>asdasgsa</p>
          </div>

          <Link to='/'><button onClick={this.props.logout}>logout</button></Link>


          { /* POPUP FOR ON CLICK SETTINGS */ }

          <div className="popup"  style={popupStyle} onClick={(e)=>{this.togglePopup(e)}}>
            <p onClick={()=>{this.togglePopup()}}>XXXX</p>
            <form style={formStyle}>
              <input type="text" placeholder='Display Name'/>
              <input type="text" placeholder='Update Email'/>
              <input type="text" placeholder='Update Password'/>
              <button>Submit</button>
            </form>
          </div>
        </div>
      )
    }
  }

  render() {
    return(
      <div className="header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Hosers & Hoseheads" /></Link>
        </div>
        {this.adminDashboard()}
      </div>
    )
  }
}

export default Header;

// <button onClick={()=>{rebaseAuth.signOut(), console.log(this.props.admin, 'admin')}}>logout</button>
