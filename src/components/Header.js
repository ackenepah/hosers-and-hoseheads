import React from 'react';
import logo from '../img/logo.png';

class Header extends React.Component {
  render() {
    return(
      <div>
        <div className="logo">
          <img src={logo} alt="Hosers & Hoseheads" />
        </div>
      </div>
    )
  }
}

export default Header;
