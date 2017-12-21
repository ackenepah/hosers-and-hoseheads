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

    const recap = {
      title: this.state.title,
      summary: this.state.summary
    }

    database.push(recap)
  }

  render() {
    return(
      <div>
        <div className="admin-dashboard">
          <div className="admin-settings">
            <img src="http://placehold.it/50x50" alt="User" />
            <span>Welcome, User</span>
          </div>
        </div>

        <div className="admin-post">
          <form>
            <div className="admin-article-dets">
              <div className="admin-article-desc">
                <label>Post Title</label>
                <input type="text" name="title" placeholder="Week 1 Recap" />

                <label>Post Summary</label>
                <input type="text" name="summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
              </div>
              <div className="admin-article-image">
                <label>Post Image</label>
                <input type="file" name="article-image" accept="image/*" />

                <img src="http://placehold.it/300x150" alt="Article Image" />
                <span className="admin-img-remove">Delete</span> <span>/</span> <span className="admin-img-replace">Replace</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Admin;
