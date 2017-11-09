import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/news'>News</Link></li>
            <li><Link to='/rules'>Rules</Link></li>
            <li><Link to='/members'>Members</Link></li>
            <li><Link to='/awards'>Awards</Link></li>
            <li><Link to='/info'>Info</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header
