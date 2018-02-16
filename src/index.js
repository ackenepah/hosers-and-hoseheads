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
import ArticleView from './components/ArticleView';
import NotFound from './components/NotFound';

import { rebaseAuth } from './config';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      admin: {
        loggedIn: false,
        adminUser: {}
      },
      loading: false
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    this.setState({loading: true})
    // console.log(rebaseAuth.currentUser, 'CURRENT USER IN componentWillMount');
  }

  handleAuth(adminUser){
    const admin = {...this.state.admin, adminUser, loggedIn: true}
    // console.log(admin, 'admin index');
    this.setState({admin})
  }

  logout(){
    rebaseAuth.signOut().then(()=>{
      console.log('logging out');
      let admin = {...this.state.admin, loggedIn: false, adminUser: {}};
      this.setState({admin})
    });
  }


  setMyState(){
    var that = this;
    setTimeout(function () {
      // console.log('fireing', rebaseAuth);
      if(rebaseAuth.currentUser){
        let adminUser = rebaseAuth.currentUser
        let admin = {adminUser: adminUser, loggedIn: true}
        console.log(admin);
        that.setState({admin})
      }
      that.setState({loading: false})
    }, 500);
  }

  updateAdmin(data){
    console.log(data, 'IN INDEXJS');

    var user = rebaseAuth.currentUser;

    user.updateProfile({
      displayName: data.displayName,
      photoURL: data.profilePicture
    }).then(function() {
      console.log('profile updated!');
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });


    user.updateEmail("k@k.com").then(function() {
      console.log('email updated!');
      // Update successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error, 'email error');
    });

  }


  render(){
    if(this.state.loading){
      return (
        <div>
          <h1>LOADING....</h1>
          {this.setMyState()}
        </div>
      )
    } else {
      return(
        <Flexbox flexDirection="column" minHeight="100vh">

          <Flexbox element="main" flexGrow={1}>
            <BrowserRouter>
              <div>
                <Match exactly pattern="/"  render={(props) => <Home {...props}  updateAdmin={this.updateAdmin} admin={this.state.admin} logout={this.logout}/> }/>
                <Match pattern="/admin" render={(props) => <Admin {...props} updateAdmin={this.updateAdmin} admin={this.state.admin} logout={this.logout} handleAuth={this.handleAuth}/> }/>
                <Match pattern="/articleview" component={ArticleView}/>
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
}

render(<Root />, document.querySelector('#main'));
