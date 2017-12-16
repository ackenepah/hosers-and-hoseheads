import React from 'react';
import Flexbox from 'flexbox-react';

import '../css/reset.css';
import '../css/base.css';
import '../css/layout.css';
import '../css/modules.css';

import Header from './Header';
import Admin from './Admin';

class App extends React.Component {
  render() {
    return(
      <Flexbox flexDirection="column" minHeight="100vh">
        <Flexbox element="header">
          <Header />
        </Flexbox>

        <Flexbox element="main" flexGrow={1}>
          <Admin />
        </Flexbox>

        <Flexbox element="footer">
          Footer
        </Flexbox>
      </Flexbox>
    )
  }
}

export default App;
