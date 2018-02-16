import React from 'react';
import { Link } from 'react-router';
import logo from '../img/logo.png';
import '../css/header.css';

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
    if(e && (e.target.nodeName === 'FORM' || e.target.nodeName === 'INPUT' || e.target.nodeName === 'BUTTON' || e.target.nodeName === 'LABEL' || e.target.parentNode.className.split(" ")[0] === "form-modal" )){
      // console.log('not closing');
    } else {
      this.setState({popupOpen: !this.state.popupOpen})
    }
  }


  headerFormSubmit(e, type){
    e.preventDefault();
    console.log('getting here');

    //should validate data being given


    // const updateAdminData = {
    //   displayName: this.displayName.value,
    //   profilePicture: this.profilePicture.value,
    //   email: this.email.value,
    //   password: this.password.value,
    //   password2: this.password2.value
    // }

    const updateAdminData = {
      updateProfile: {
        displayName: this.displayName.value,
        profilePicture: this.profilePicture.value
      },
      updateEmail: {
        email: this.email.value
      },
      updatePassword: {
        password: this.password.value,
        password2: this.password2.value
      }
    }
    console.log(type, 'updateAdmin');

    console.log(updateAdminData[type], 'updateAdmin');

    this.props.updateAdmin(updateAdminData[type], type)
    this.setState({popupOpen: !this.state.popupOpen})

  }


  adminDashboard(){
    console.log(this.state.popupOpen, 'popup');
    let popupStyle = {
      display: 'none'
    }

    // let popupStyle2 = {
    //   display: 'none'
    // }


    popupStyle.display = this.state.popupOpen === true ? popupStyle.display = 'flex' : 'none';

    // popupStyle2.display = this.props.emailError === true ? popupStyle2.display = 'flex' : 'none';

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

          <div className="popup" style={popupStyle} onClick={(e)=>{this.togglePopup(e)}}>
            <p onClick={()=>{this.togglePopup()}}>XXXX</p>
            <div className="modal edit-form" id="haha">

              <form className="form-modal update-profile" onSubmit={(e) => this.headerFormSubmit(e, 'updateProfile')}>
                <div>
                  <label htmlFor=""> Display Name</label>

                  <input type="text" ref={(input) => this.displayName = input} defaultValue={this.props.admin.adminUser.displayName} placeholder='Display Name'/>
                  <label htmlFor=""> Profile Picture URL </label>
                  <input type="text" ref={(input) => this.profilePicture = input} defaultValue={this.props.admin.adminUser.photoURL} placeholder='Profile Picture'/>

                </div>
                <button>Update Profile</button>

              </form>

              <form className="form-modal update-email" onSubmit={(e) => this.headerFormSubmit(e, 'updateEmail')}>
                <div>
                  <label htmlFor=""> Email</label>
                  <input type="email" ref={(input) => this.email = input} defaultValue={this.props.admin.adminUser.email} placeholder='Update Email'/>

                </div>
                <button>Update Email</button>

              </form>

              <form className="form-modal update-password" onSubmit={(e) => this.headerFormSubmit(e, 'updatePassword')}>
                <div>
                  <label htmlFor=""> Update Password </label>

                  <input disabled type="text" ref={(input) => this.password = input} placeholder='Update Password'/>
                  <label htmlFor=""> Confirm Password </label>
                  <input disabled type="text" ref={(input) => this.password2 = input} placeholder='Confirm Password'/>
                </div>
                <button disabled>Update Password</button>


              </form>




            </div>
          </div>

        { /*   <div className="popup" style={popupStyle2}>
            HERE IS AN ALERT MODAL HAHA
          </div>
          */ }

        </div>
      )
    }
  }

  render() {

    console.log(this.props.emailError, 'emailError');
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
