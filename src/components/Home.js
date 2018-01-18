import React from 'react';

import Header from './Header';
import News from './News';

class App extends React.Component {
  render() {
    return(
      <div>
        <Header admin={this.props.admin}/>
        <News />
      </div>
    )
  }
}

export default App;
