import React from 'react';
import { Link } from 'react-dom';
import { database } from '../firebase';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        name: '',
        image: ''
      },
      recap: {
        title: '',
        summary: '',
        image: '',
        intro: '',
        match_intro: '',
        standings: {
          position: '',
          team: {
            name: ''
          },
          points: ''
        },
        matchup_recap: {
          title: '',
          score: '',
          body: '',
          team_mvplvp: {
            team: {
              name: ''
            },
            body: ''
          }
        }
      }
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
        <div className="admin-dashboard">
          <h1>Welcome, User</h1>
          <div className="admin-settings">
            <img src="http://placehold.it/50x50" />
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;
