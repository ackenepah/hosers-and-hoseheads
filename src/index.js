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
        loggedIn: false
      }
    }

    this.handleAuth = this.handleAuth.bind(this);
  }


  handleAuth(adminUser){

    const admin = {...this.state.admin, adminUser, loggedIn: true}

    console.log(admin, 'admin index');

    this.setState({admin})
    // console.log(formInfo, 'getting to index.js');


    // switch(type){
    //   case 'signup': {
    //     return console.log('signup submitted');
    //   }
    //   case 'reset': {
    //     return console.log('reset submitted');
    //   }
    //   case 'login': {
    //       console.log('login submitted');
    //       rebaseAuth.signInWithEmailAndPassword(formInfo.email, formInfo.password).then(user => {
    //         console.log(user, 'signed in');
    //         console.log(rebaseAuth.currentUser, 'rebaseAuth');
    //         const admin = {...this.state.admin, user, loggedIn:true}
    //         this.setState({admin})
    //       }).catch(err => console.log(err, 'error'))
    //       break;
    //   }
    //   default: return false
    // }


    // let displayName = null;
    // let email = this.email.value;
    // let password = null;
    // let confirmPassword = null;
    // //
    // if(type === 'signup' || type === 'login'){
    //   password = this.pass.value;
    // }
    // //
    // // // if(!displayName || !email || !password || !confirmPassword)
    // //
    // // if(!email){
    // //   console.log('no email, not moving forward');
    // // } else {
    // //
    // //   if(type === 'signup'){
    // //     console.log('getting to signup');
    // //     displayName = this.display.value;
    // //     confirmPassword = this.confirmPass.value;
    // //     if(!displayName){
    // //       console.log('please enter display name');
    // //     }
    // //     if(confirmPassword !== password){
    // //       console.log('passwords must be the same');
    // //     } else {
    // //
    // //     }
    // //   } else if(type === 'reset'){
    // //     console.log('I WANNA RESET');
    // //   } else if(type === 'login' && this.state.formType === null){
    // //     console.log('getting here');
    //     rebaseAuth.signInWithEmailAndPassword(email, password).then(user => {
    //       console.log(user, 'signed in');
    //       console.log(rebaseAuth.currentUser, 'rebaseAuth');
    //       const admin = {...this.state.admin, user, loggedIn:true}
    //       this.setState({admin})
    //     })



    //   } else {
    //     console.log('here too');
    //   }
    // }

    // var email = 'k@k.comm';
    // var password  = 'kkkkkk';
    // rebaseAuth.createUserWithEmailAndPassword(email,password).then(user => {
    //   console.log(user, 'user created!');
    // });
    // console.log(rebaseAuth.currentUser, 'rebaseAuth');
    // rebaseAuth.signInWithEmailAndPassword(email, password).then(user => {
    //   console.log(user, 'signed in');
    //   console.log(rebaseAuth.currentUser, 'rebaseAuth');
    //
    // })
  }

  render(){
    return(
      <Flexbox flexDirection="column" minHeight="100vh">

        <Flexbox element="main" flexGrow={1}>
          <BrowserRouter>
            <div>
              <Match exactly pattern="/"  render={(props) => <Home {...props} admin={this.state.admin}/> }/>
              <Match pattern="/admin" render={(props) => <Admin {...props} admin={this.state.admin} handleAuth={this.handleAuth}/> }/>
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
