import React from 'react';
import { Link } from 'react-router';
import logo from '../img/logo.png';
import { rebaseAuth } from '../config';

class Header extends React.Component {

  adminDashboard(){
    if(this.props.admin.loggedIn){
      return (
        <div className="admin-dashboard">
          <div className="admin-settings">
            <Link to="/admin">
              <img src="http://placehold.it/50x50" alt="User" />
              <span>Welcome, {this.props.admin.adminUser.displayName ? this.props.admin.adminUser.displayName : this.props.admin.adminUser.email}</span>
            </Link>
          </div>
          <Link to='/'><button onClick={this.props.logout}>logout</button></Link>
        </div>
      )
    }
  }

  render() {
    console.log(this.props);
    console.log(rebaseAuth.currentUser, 'currentUser in header');
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
