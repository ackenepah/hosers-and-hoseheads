import React from 'react';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    e.preventDefault()

    this.setState({
      [e.target.value]: e.target.value
    })
  }

  render() {
    return(
      <div className="container">
        <form>
          <input type="text" name="title" placeholder="The Post Title" onChange={this.onInputChange} ref="title" />
          <input type="text" name="body" placeholder="Write your blog post" onChange={this.onInputChange} ref="body" />
          <button>Post</button>
        </form>
      </div>
    )
  }
}

export default Admin;
