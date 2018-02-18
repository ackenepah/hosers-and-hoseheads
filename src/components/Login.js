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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFormOnChange = this.clearFormOnChange.bind(this);
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

  componentDidMount(){
    this.setState({loading: false})
  }

  clearFormOnChange(id){
    id.reset();
  }

  handleSubmit(e, type){
    e.preventDefault();
    let user = {}
    if(type === 'signup'){
      user.displayName = this.display.value
      user.email = this.email.value
      user.password = this.pass.value
      user.confirmPassword = this.confirmPass.value
    } else if(type === 'reset'){
      user.email = this.email.value
    } else if(type === 'login'){
      user.email = this.email.value
      user.password = this.pass.value

      if(user.password.length < 6){
        console.log('password must be at least 6 characters');
      } else {
        rebaseAuth.signInWithEmailAndPassword(user.email, user.password).then(firebaseUser => {
          console.log(rebaseAuth.currentUser, 'rebaseAuth');
          this.props.handleAuth(firebaseUser)
        }).catch(err => {
          if(err.code === "auth/user-not-found"){
            alert('incorrect email or password')
          }
        })
      }
    }
  }



  render(){

    if(this.state.loading){
      console.log('WE ARE LOADING');
      return (<div> <h1>LOADING....</h1> </div>)
    } else if(this.state.formType === 'signup'){
      return (
        <div>
          <h1>Sign Up</h1>

          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleSubmit(e, 'signup')}>
            <input ref={(input) => this.display = input} type="text" placeholder="Display Name" required/>
            <input ref={(input) => this.email = input} type="email" placeholder="Email" required/>
            <input ref={(input) => this.pass = input} type="text" placeholder="Password" required/>
            <input ref={(input) => this.confirmPass = input} type="text" placeholder="Confirm Password" required/>

            <button>Sign Up</button>
            <Link to="/admin" onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: null})}}><p>Log In</p></Link>
          </form>
        </div>
      )
    } else if (this.state.formType === 'reset'){
      return (
        <div>
          <h1>resetPassword</h1>

          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleSubmit(e, 'reset')}>
            <input ref={(input) => this.email = input} type="email" placeholder="Email" required/>
            <button>Reset Password</button>

            { /* cliking login button inside form submits the form - should not be submitting form! */ }
            { /* <button type="button" onClick={()=>{this.setState({formType: null})}}>Log In</button> */ }

            { /* can use p tage with button styling class to not submit form */ }
            <button type="button" onClick={()=>{this.setState({formType: null})}}>Log In</button>
            <p onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: null})}}>Log In</p>


          </form>
          { /* works but outside the form */ }


        </div>
      )
    } else if (this.state.formType === null){
      return (
        <div>
          <h1>Login Component</h1>
          <form ref={(el) => this.form = el} onSubmit={(e)=> this.handleSubmit(e, 'login')}>
            <input ref={(input) => this.email = input} type="email" placeholder="Email" required/>
            <input ref={(input) => this.pass = input} type="text" placeholder="Password" required/>
            <button>Log In</button>
            <p onClick={()=>{this.clearFormOnChange(this.form); this.setState({formType: 'reset'})}}>resetPassword</p>
          </form>
        </div>
      )
    }
  }
}

export default Login;
