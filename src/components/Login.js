import React from 'react';
import { Link } from 'react-router';
// import { rebaseAuth } from '../config';

class Login extends React.Component {

  constructor(){
    super();

    this.state = {
      pathname: null,
      formType: null,
      resetPassword: false
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.clearFormOnChange = this.clearFormOnChange.bind(this);
  }

  componentWillMount(){
    if(this.props.pathname === '/admin/signup'){
      const formType = 'signup'
      this.setState({formType})
    }
  }
  componentDidUpdate(){
    console.log(this.state, 'componentDidUpdate');
  }

  handleAuth(e, type){
    e.preventDefault();
    let displayName = null;
    let email = this.email.value;
    let password = null;
    let confirmPassword = null;

    if(type === 'signup' || type === 'login'){
      password = this.pass.value;
    }

    // if(!displayName || !email || !password || !confirmPassword)

    if(!email){
      console.log('no email, not moving forward');
    } else {

      if(type === 'signup'){
        console.log('getting to signup');
        displayName = this.display.value;
        confirmPassword = this.confirmPass.value;
        if(!displayName){
          console.log('please enter display name');
        }
        if(confirmPassword !== password){
          console.log('passwords must be the same');
        } else {

        }
      } else if(type === 'reset'){
        console.log('I WANNA RESET');
      } else if(type === 'login' && this.state.formType === null){
        console.log('getting here');
        // rebaseAuth.signInWithEmailAndPassword(email, password).then(user => {
        //   console.log(user, 'signed in');
        //   console.log(rebaseAuth.currentUser, 'rebaseAuth');
        //
        // })
      } else {
        console.log('here too');
      }
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

  clearFormOnChange(id){
    id.reset();
  }


  render(){

    if(this.state.formType === 'signup'){
      return (
        <div>
          <h1>Sign Up</h1>

          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleAuth(e, 'signup')}>
            <input ref={(input) => this.display = input} type="text" placeholder="Display Name"/>
            <input ref={(input) => this.email = input} type="text" placeholder="Email"/>
            <input ref={(input) => this.pass = input} type="text" placeholder="Password"/>
            <input ref={(input) => this.confirmPass = input} type="text" placeholder="Confirm Password"/>

            <button>Sign Up</button>
            <Link to="/admin" onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: null})}}><button type='button'>Log In</button></Link>
          </form>
        </div>
      )
    } else if (this.state.formType === 'reset'){
      return (
        <div>
          <h1>resetPassword</h1>

          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleAuth(e, 'reset')}>
            <input ref={(input) => this.email = input} type="text" placeholder="Email"/>
            <button>Reset Password</button>

            { /* cliking login button inside form submits the form - should not be submitting form! */ }
            { /* <button type="button" onClick={()=>{this.setState({formType: null})}}>Log In</button> */ }

            { /* can use p tage with button styling class to not submit form */ }
            <button type="button" onClick={()=>{this.setState({formType: null})}}>Log In</button>
            <p onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: null})}}>Log In</p>


          </form>
          { /* works but outside the form */ }

          <button type="button" onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: null})}}>Log In</button>

        </div>
      )
    } else if (this.state.formType === null){
      return (
        <div>
          <h1>Login Component</h1>
          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleAuth(e, 'login')}>
            <input ref={(input) => this.email = input} type="text" placeholder="Email"/>
            <input ref={(input) => this.pass = input} type="text" placeholder="Password"/>
            <button>Log In</button>
            <button type='button' onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: 'reset'})}}>resetPassword</button>
          </form>
        </div>
      )
    }
  }
}

export default Login;
