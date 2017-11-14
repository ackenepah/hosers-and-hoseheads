import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/header.css'

class Header extends Component {
  render() {
    return (
      <header>
          <nav>
            <div className="navbar">
              <Link to='/'>
              <div className="logo"></div>
              </Link>

              <div className="nav-icon"></div>
            </div>

            <div className="nav-menu">
              <ul>
                <Link to='/news' className="nav-link"><li>News</li></Link>
                <Link to='/rules' className="nav-link"><li>Rules</li></Link>
                <Link to='/gms' className="nav-link"><li>GMS</li></Link>
                <Link to='/awards' className="nav-link"><li>Awards</li></Link>
              </ul>
            </div>
          </nav>
      </header>
    );
  }
}

export default Header
