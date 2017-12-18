import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import Flexbox from 'flexbox-react';
import './css/reset.css';
import './css/base.css';
import './css/layout.css';
import './css/modules.css';

import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';

import Admin from './components/Admin';
import Blog from './components/Blog';

const Root = () => {
  return(
    <Flexbox flexDirection="column" minHeight="100vh">
      <Flexbox element="header">
        <Header />
      </Flexbox>

      <Flexbox element="main" flexGrow={1}>
        <BrowserRouter>
          <div>
            <Match exactly pattern="/" component={Home} />
            <Match pattern="/admin" component={Admin} />
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

render(<Root />, document.querySelector('#main'));
