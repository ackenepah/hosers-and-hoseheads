import React from 'react';
import { Link } from 'react-router';
import logo from '../img/logo.png';

class Header extends React.Component {

  adminDashboard(){
    if(this.props.admin.loggedIn){
      return (
        <div className="admin-dashboard">
          <div className="admin-settings">
            <Link to="/admin">
              <img src="http://placehold.it/50x50" alt="User" />
              <span>Welcome, User</span>
            </Link>
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
