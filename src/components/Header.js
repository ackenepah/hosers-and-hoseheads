import React from 'react';
import Flexbox from 'flexbox-react';

class Header extends React.Component {
  render() {
    return(
      <Flexbox className="navbar">
        <div className="logo">
          {/* PLACEHOLDER */}
        </div>

        <div className="nav-container">
          <div className="nav-menu-icon">
            <span></span>
          </div>
          <nav className="horizontal-nav primary wrapper" role="navigation">
            <ul>
              <li>League News</li>
              <li>Rules</li>
              <li>The GMs</li>
              <li>Awards</li>
              <li>Info</li>
            </ul>
          </nav>
        </div>
      </Flexbox>
    )
  }
}

export default Header;
