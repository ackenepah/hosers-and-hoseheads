import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import News from '../containers/News'
import Rules from '../containers/Rules'
import GMS from '../containers/GMS'
import Awards from '../containers/Awards'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/news' component={News}/>
          <Route path='/rules' component={Rules}/>
          <Route path='/gms' component={GMS}/>
          <Route path='/awards' component={Awards}/>
        </Switch>
      </main>
    );
  }
}

export default Main
