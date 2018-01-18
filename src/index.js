import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import Flexbox from 'flexbox-react';
import './css/reset.css';
import './css/base.css';
import './css/layout.css';
import './css/modules.css';

import Home from './components/Home';
import Admin from './components/Admin';
import NotFound from './components/NotFound';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      admin: {
        loggedIn: true
      }
    }
  }

  render(){
    return(
      <Flexbox flexDirection="column" minHeight="100vh">

        <Flexbox element="main" flexGrow={1}>
          <BrowserRouter>
            <div>
              <Match exactly pattern="/"  render={(props) => <Home {...props} admin={this.state.admin}/> }/>
              <Match pattern="/admin" render={(props) => <Admin {...props} admin={this.state.admin}/> }/>
              <Miss component={NotFound} />
            </div>
          </BrowserRouter>
        </Flexbox>

        <Flexbox element="footer">
          Footer
        </Flexbox>
      </Flexbox>
    )
  }
}

render(<Root />, document.querySelector('#main'));
