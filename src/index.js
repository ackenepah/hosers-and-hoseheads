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

import { rebaseAuth } from './config';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      admin: {
        loggedIn: false,
        adminUser: {}
      },
      loading: false,
      emailError: false
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
    this.toggleEmailError = this.toggleEmailError.bind(this);
  }

  componentWillMount(){
    this.setState({loading: true})
  }

  handleAuth(adminUser){
    const admin = {...this.state.admin, adminUser, loggedIn: true}
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
    // setTimeout(function () {
    //   if(rebaseAuth.currentUser){
    //     let adminUser = rebaseAuth.currentUser
    //     let admin = {adminUser: adminUser, loggedIn: true}
    //     console.log(admin);
    //     that.setState({admin})
    //   }
    //   that.setState({loading: false})
    // }, 500);

    rebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        let adminUser = user
        let admin = {adminUser: adminUser, loggedIn: true}
        console.log(admin);
        that.setState({admin})
      } else {
        // No user is signed in.
        console.log("NO USER IS SIGNED IN");
      }
      that.setState({loading: false})

    });
  }

  updateAdmin(data, type){
    console.log(data, 'IN INDEXJS');

    const user = rebaseAuth.currentUser;
    var that = this;
    if (type === 'updateProfile'){
      user.updateProfile({
        displayName: data.displayName,
        photoURL: data.profilePicture
      }).then(function() {
        console.log('profile updated!');
        let admin = {adminUser: user, loggedIn: true}
        that.setState({admin})
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error, "profile error");
      });
    } else if (type === 'updateEmail'){
      user.updateEmail(data.email).then(function() {
        // Update successful.
        console.log('email updated!');
        let admin = {adminUser: user, loggedIn: true}
        that.setState({admin})
      }).catch(function(error) {
        // An error happened.
        console.log(error, 'email error');
        if(error.code === "auth/requires-recent-login"){
          // alert('please log out and then log back in and then update your email')
          that.setState({emailError: true})
        }
      });

    } else if(type === 'updatePassword'){
      console.log('update password');
    }
  }

  toggleEmailError(){
    this.setState({emailError: !this.state.emailError})
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
                <Match pattern="/admin" render={(props) => <Admin {...props} updateAdmin={this.updateAdmin} admin={this.state.admin} logout={this.logout} handleAuth={this.handleAuth} emailError={this.state.emailError} toggleEmailError={this.toggleEmailError}/> }/>
                <Miss component={NotFound} />
              </div>
            </BrowserRouter>
          </Flexbox>
        </Flexbox>
      )
    }
  }
}

render(<Root />, document.querySelector('#main'));
