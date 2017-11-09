import React, { Component } from 'react'

import '../css/reset.css'
import '../css/global.css'
import '../css/fonts.css'

import Header from './Header'
import Main from './Main'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
