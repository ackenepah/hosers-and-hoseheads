import React from 'react';
import logo from '../img/logo.png';

class Header extends React.Component {
  render() {
    return(
      <div className="logo">
        <a href="/"><img src={logo} alt="Hosers & Hoseheads" /></a>
      </div>
    )
  }
}

export default Header;
