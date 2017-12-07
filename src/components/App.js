import React from 'react';
import Flexbox from 'flexbox-react';

import '../css/reset.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/modules.css';

import Header from './Header';

class App extends React.Component {
  render() {
    return(
      <Flexbox flexDirection="column" minHeight="100vh">
        <Flexbox element="header" height="60px">
          <Header />
        </Flexbox>

        <Flexbox element="main" flexGrow={1}>
          Content
        </Flexbox>

        <Flexbox element="footer" height="20px">
          Footer
        </Flexbox>
      </Flexbox>
    )
  }
}

export default App;
