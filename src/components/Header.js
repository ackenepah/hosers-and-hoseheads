import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <nav>
            <Link to='/'>
            <div className="logo"></div>
            </Link>
            <ul>
              <Link to='/news' className="nav-link"><li>News</li></Link>
              <Link to='/rules' className="nav-link"><li>Rules</li></Link>
              <Link to='/gms' className="nav-link"><li>GMS</li></Link>
              <Link to='/awards' className="nav-link"><li>Awards</li></Link>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header
