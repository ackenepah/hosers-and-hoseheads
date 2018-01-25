import React from 'react';
import { Link } from 'react-router';
import { rebaseAuth } from '../config';

class Login extends React.Component {

  constructor(){
    super();

    this.state = {
      pathname: null,
      formType: null,
      resetPassword: false
    }
  }

  componentWillMount(){
    if(this.props.pathname === '/admin/signup'){
      const formType = 'signup'
      this.setState({formType})
    }
  }
  componentDidUpdate(){
    // console.log(this.state, 'componentDidUpdate');
  }

  handleAuth(e, type){
    e.preventDefault();
    // console.log(this.email.value);
    // console.log(this.pass.value);
    const email = this.email.value;
    const password = this.pass.value;
    if(type === 'signup'){
      const confirmPassword = this.confirmPass.value;

      if(confirmPassword !== password){
        console.log('passwords must be the same');
      } else {

      }
    } else if(type === 'login'){
      rebaseAuth.signInWithEmailAndPassword(email, password).then(user => {
        console.log(user, 'signed in');
        console.log(rebaseAuth.currentUser, 'rebaseAuth');

      })
    }

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

    if(this.state.formType === 'signup'){
      return (
        <div>
          <h1>Sign Up</h1>

          <form onSubmit={(e)=> this.handleAuth(e, 'signup')}>
            <input ref={(input) => this.email = input} type="text" placeholder="Email"/>
            <input ref={(input) => this.pass = input} type="text" placeholder="Password"/>
            <input ref={(input) => this.confirmPass = input} type="text" placeholder="Confirm Password"/>

            <button>Sign Up</button>
            <Link to="/admin" onClick={() => {this.setState({formType: null})}} ><button type='button'>Log In</button></Link>
          </form>
        </div>
      )
    } else if (this.state.resetPassword){
      return (
        <div>
          <h1>resetPassword</h1>

          <form onSubmit={(e)=> this.handleAuth(e, 'reset')}>
            <input ref={(input) => this.email = input} type="text" placeholder="Email"/>

            <button>Reset Password</button>
            <button type='button' onClick={() => {this.setState({resetPassword: false})}}>Log In</button>
          </form>
        </div>
      )
    }
    return (
      <div>
        <h1>Login Component</h1>
        <form onSubmit={(e)=> this.handleAuth(e, 'login')}>
          <input ref={(input) => this.email = input} type="text" placeholder="Email"/>
          <input ref={(input) => this.pass = input} type="text" placeholder="Password"/>
          <button>click me!</button>
          <button type='button' onClick={() => {this.setState({resetPassword: true})}}>resetPassword</button>
        </form>
      </div>
    )
  }
}

export default Login;
