import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import News from './News'
import Rules from './Rules'
import Members from './Members'
import Awards from './Awards'
import Info from './Info'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
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
