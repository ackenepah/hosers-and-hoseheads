import React from 'react';
import base from '../config';
import MatchupRecap from './MatchupRecap';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.handleStaged = this.handleStaged.bind(this);

    this.state = {
      user: {
        name: '',
        image: ''
      },
      recaps: {
        title: '',
        summary: '',
        image: '',
        article_intro: '',
        match_intro: '',
        standings: {
          team: {
            name: ''
          },
          points: ''
        },
        matchup_recaps: [],
        post_date: ''
      },
      staged_matchups: []
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/posts`, {
      context: this,
      state: 'recaps'
    })
  }

  submitRecap(e, staged){
    e.preventDefault()
    if(this.state.staged_matchups && this.state.staged_matchups.length <= 0){
      alert("please select at least one matchpp")
    } else {
      const timeStamp = Date.now();
      const newRecap = {...this.state.new_recap};
      const recap = {
        title: this.title.value,
        summary: this.summary.value,
        image: this.image.value,
        article_intro: this.articleIntro.value,
        matchup_intro: this.matchupIntro.value,
        standings: {
          team: this.teamName.value,
          points: this.teamPoints.value,
        },
        matchup_recaps: this.state.staged_matchups,
        post_date: timeStamp
      }
      newRecap[`recap-${timeStamp}`] = recap;
      this.setState({recaps: newRecap, staged_matchups: []})
      this.mainForm.reset();
    }
  }

  handleStaged(matchup_recaps, type){
    //this function is not needed - data is being manipulated directly in MatchupRecap component

    // if(type === 'new'){
    //   console.log('ADDING NEW!!!');
    //   const currentState = this.state.staged_matchups.concat(matchup_recaps)
    //   console.log(currentState, 'currentState');
    //   this.setState({staged_matchups: currentState});
    // } else if (type === 'edit'){
    //   console.log('ediitng hahah');
    // } else if (type === 'delete'){
    //   console.log('DELETINGGGG');
    // }
  }


  componentDidUpdate(){
    console.log(this.state.staged_matchups, 'staged_matchups componentDidUpdate Admin');
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

          <form onSubmit={(e) => this.submitRecap(e)} ref={(input) => {this.mainForm = input}}>
            <div className="admin-article-dets">
              <div className="admin-article-desc">
                <label>Post Title</label>
                <input ref={(input) => this.title = input} type="text" placeholder="Week 1 Recap" />

                <label>Post Summary</label>
                <input ref={(input) => this.summary = input} type="text" name="Summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
              </div>
              <div className="admin-article-image">
                <label>Post Image</label>
                <input ref={(input) => this.image = input} type="text" name="Article Image" accept="image/*" />

                <img src="http://placehold.it/300x150" alt="Article" />
                <span className="remove">Delete</span> <span>/</span> <span className="edit">Replace</span>
              </div>

              <div className="admin-article-content">
                <label>Post Intro</label>
                <textarea ref={(input) => this.articleIntro = input} type="text" name="Article Intro" />

                <label>Match Intro</label>
                <textarea ref={(input) => this.matchupIntro = input} type="text" name="Match Intro" />

                <div className="admin-article-standings">
                  <div className="standings-data">
                    <h3>Current Standings:</h3>
                    <label>Team:</label>
                    <select>
                      <option ref={(input) => this.teamName = input} value="The Kessel Run">The Kessel Run</option>
                    </select>

                    <label>Points:</label>
                    <input ref={(input) => this.teamPoints = input} type="text" name="Teams Points" />
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
            <button>click me</button>
          </form>
        </div>

        <MatchupRecap handleStaged={this.handleStaged} stagedMatchups={this.state.staged_matchups}/>

      </div>
    )
  }
}

export default Admin;
