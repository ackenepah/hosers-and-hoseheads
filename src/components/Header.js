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
    this.headerFormSubmit = this.headerFormSubmit.bind(this);
  }


  togglePopup(e){
    console.log('popup fired');
    if(e && (e.target.nodeName === 'FORM' || e.target.nodeName === 'INPUT' || e.target.nodeName === 'BUTTON')){
      console.log('not closing');
    } else {
      this.setState({popupOpen: !this.state.popupOpen})
    }
  }


  headerFormSubmit(e){
    e.preventDefault();
    console.log('getting here');


    const updateAdminData = {
      displayName: this.displayName.value,
      profilePicture: this.profilePicture.value,
      email: this.email.value,
      password: this.password.value,
      password2: this.password2.value
    }

    console.log(updateAdminData);

    this.props.updateAdmin(updateAdminData)
    this.setState({popupOpen: !this.state.popupOpen})

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

    const profilePicture = this.props.admin.adminUser.photoURL ? this.props.admin.adminUser.photoURL : "http://placehold.it/50x50";
    const userName = this.props.admin.adminUser.displayName ? this.props.admin.adminUser.displayName : this.props.admin.adminUser.email;

    if(this.props.admin.loggedIn){
      return (
        <div className="admin-dashboard">
          <div className="admin-settings">
            <Link className="admin-link" to="/admin">
              <img src={profilePicture} alt="User" />
              <span>Welcome, {userName}</span>
            </Link>
            <p onClick={()=>{this.togglePopup()}}>Edit</p>
          </div>

          <Link to='/'><button onClick={this.props.logout}>logout</button></Link>


          { /* POPUP FOR ON CLICK SETTINGS */ }

          <div className="popup"  style={popupStyle} onClick={(e)=>{this.togglePopup(e)}}>
            <p onClick={()=>{this.togglePopup()}}>XXXX</p>
            <form style={formStyle} onSubmit={this.headerFormSubmit}>
              <input type="text" ref={(input) => this.displayName = input} defaultValue={this.props.admin.adminUser.displayName} placeholder='Display Name'/>
              <input type="text" ref={(input) => this.profilePicture = input} defaultValue={this.props.admin.adminUser.photoURL} placeholder='Profile Picture'/>
              <input type="text" ref={(input) => this.email = input} defaultValue={this.props.admin.adminUser.email} placeholder='Update Email'/>
              <input type="text" ref={(input) => this.password = input} placeholder='Update Password'/>
              <input type="text" ref={(input) => this.password2 = input} placeholder='Confirm Password'/>

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
