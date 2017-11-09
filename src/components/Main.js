import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import News from '../containers/News'
import Rules from '../containers/Rules'
import Members from '../containers/Members'
import Awards from '../containers/Awards'
import Info from '../containers/Info'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/news' component={News}/>
          <Route path='/rules' component={Rules}/>
          <Route path='/members' component={Members}/>
          <Route path='/awards' component={Awards}/>
          <Route path='/info' component={Info}/>
        </Switch>
      </main>
    );
  }
}

export default Main
