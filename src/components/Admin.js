import React from 'react';
import { database } from '../firebase';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }

  onInputChange(e) {
    this.setState({
      [e.target.value]: e.target.value
    })
  }

  onHandleSubmit(e) {
    e.preventDefault()

    const post = {
      title: this.state.title,
      body: this.state.body
    }
    
    database.push(post)
  }

  render() {
    return(
      <div className="container">
        <form onSubmit={this.onHandleSubmit}>
          <input type="text" name="title" placeholder="The Post Title" onChange={this.onInputChange} ref="title" />
          <input type="text" name="body" placeholder="Write your blog post" onChange={this.onInputChange} ref="body" />
          <button>Post</button>
        </form>
      </div>
    )
  }
}

export default Admin;
