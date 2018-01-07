import React from 'react';
import base from '../config';
import MatchupRecap from './MatchupRecap';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.handleStaged = this.handleStaged.bind(this);
    this.getTeamPoints = this.getTeamPoints.bind(this);

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
        standings: {},
        matchup_recaps: [],
        post_date: ''
      },
      staged_standings: {},
      subStaged_standings: {},

      staged_matchups: [],
      owners: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/posts`, {
      context: this,
      state: 'recaps'
    })

    this.ref = base.syncState(`/owners`, {
      context: this,
      state: 'owners'
    })

    base.fetch('/owners', {
      context: this,
      then(data){
        this.setState({staged_standings: data})
      }
    });
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

  getTeamPoints(index, e) {
    const subStandingsCopy = [...this.state.subStaged_standings]
    let teamFound = false;
    let teamFoundIndex = "";

    for(var i = 0; i < subStandingsCopy.length; i++){
      if (e.target.name === subStandingsCopy[i].team){
        teamFound = true;
        teamFoundIndex = i;
      }
    }

    if(e.target.value && teamFound){

      subStandingsCopy[teamFoundIndex].points = e.target.value;
      subStandingsCopy.sort((a, b) =>{
        return b.points - a.points;
      })
      this.setState({subStaged_standings: subStandingsCopy})

    } else if (e.target.value){

      var obj = {
        team: e.target.name,
        points: e.target.value

      }


      subStandingsCopy.push(obj)

      subStandingsCopy.sort((a, b) =>{
        return b.points - a.points;
      })

      this.setState({subStaged_standings: subStandingsCopy})
    }



    //WORK ON LATERRRRRRR

    // if(e.target.value && teamFound){
    //
    //   subStandingsCopy[teamFoundIndex].points = e.target.value;
    //   this.setState({subStaged_standings: subStandingsCopy})
    //
    // } else if (e.target.value){
    //
    //   var obj = {
    //     team: e.target.name,
    //     points: e.target.value
    //
    //   }
    //
    //
    //   subStandingsCopy.push(obj)
    //
    //
    //   this.setState({subStaged_standings: subStandingsCopy})
    // }



  }

  renderStandings(index) {
    const team = this.state.subStaged_standings

    return <li key={index}>{team[index].team} - {team[index].points} </li>
  }

componentDidUpdate(){
  // console.log(this.state.subStaged_standings, 'componentDidUpdate');
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
                    <ul>
                    {
                      Object.keys(this.state.staged_standings).map((item, index)=> {
                        return <li key={index}> {item}  <input type="number" name={item} onBlur={(e) => this.getTeamPoints(index, e)} /></li>
                      })
                    }
                    </ul>
                  </div>

                  <div className="standings-table">
                    <ol>
                      {
                        Object.keys(this.state.subStaged_standings).map(this.renderStandings.bind(this))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <button>click me</button>
          </form>

        </div>

        <MatchupRecap handleStaged={this.handleStaged} stagedMatchups={this.state.staged_matchups} owners={this.state.owners} />

      </div>
    )
  }
}

export default Admin;
