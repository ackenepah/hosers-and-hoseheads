import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './components/App';

const Root = () => {
  return(
    <BrowserRouter>
      <Match exactly pattern="/" component={App} />
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#main'));
