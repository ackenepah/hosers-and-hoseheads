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
                <input type="text" name="Title" placeholder="Week 1 Recap" />

                <label>Post Summary</label>
                <input type="text" name="Summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
              </div>
              <div className="admin-article-image">
                <label>Post Image</label>
                <input type="file" name="Article Image" accept="image/*" />

                <img src="http://placehold.it/300x150" alt="Article Image" />
                <span className="remove">Delete</span> <span>/</span> <span className="edit">Replace</span>
              </div>

              <div className="admin-article-content">
                <label>Post Intro</label>
                <textarea type="text" name="Article Intro" />

                <label>Match Intro</label>
                <textarea type="text" name="Match Intro" />

                <div className="admin-article-standings">
                  <div className="standings-data">
                    <h3>Current Standings:</h3>
                    <label>Position:</label>
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>

                    <label>Team:</label>
                    <select>
                      <option value="The Kessel Run">The Kessel Run</option>
                    </select>

                    <label>Points:</label>
                    <input type="text" name="Teams Points" />
                  </div>

                  <div className="standings-table">
                    <ol>
                      <li>
                        <div className="standings-table-team">The Kessel Run</div>
                        <div className="standings-table-edit">
                          <span className="edit">edit</span> <span>/</span> <span className="remove">X</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Admin;
