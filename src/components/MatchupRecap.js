import React from 'react';
import owners from '../owners';

class MatchupRecap extends React.Component {

  constructor(){
    super();

    // this.handleTeamChange.bind(this);
    this.submitMatchupRecap = this.submitMatchupRecap.bind(this);
    this.state = {
      homeTeam: "",
      awayTeam: "",
      stageMatchup: []
    }
  }

  handleTeamChange(type, e){
    this.setState({[type]: e.target.value})
  }

  submitMatchupRecap(e){
    e.preventDefault();
    const stageMatchup = {
      recap: this.recap.value,
      homeTeam: this.state.homeTeam,
      homeTeamScore: this.homeTeamScore.value,
      homeMvpLvpDesc: this.homeMvpLvp.value,
      awayTeam: this.state.awayTeam,
      awayTeamScore: this.homeTeamScore.value,
      awayMvpLvpDesc: this.awayMvpLvp.value
    }
    //use spread operator to grab current state (array) and add the stageMatchup object to it
    this.setState({
      stageMatchup: [...this.state.stageMatchup, stageMatchup],
      homeTeam: "",
      awayTeam: ""
    })
    this.matchupRecapForm.reset();
  }

  componentDidUpdate(){
    console.log(this.state.stageMatchup, "componentDidUpdate");
  }

  render(){
    const homeMvpLvp = this.state.homeTeam ? this.state.homeTeam : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayTeam ? this.state.awayTeam : "Away Team MVP & LVP";


    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>
        <form ref={(input) => this.matchupRecapForm = input} onSubmit={this.submitMatchupRecap}>

          <div className="home-team">
            <select className="home-team-select" onChange={(e) => this.handleTeamChange('homeTeam', e)}>
              <option>Select Home Team</option>
              {Object.keys(owners).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input}c/>
          </div>

          <div className="away-team">
            <select className="away-team-select" onChange={(e) => this.handleTeamChange('awayTeam', e)}>
              <option>Select Away Team</option>
              {Object.keys(owners).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.awayTeamScore = input}c/>
          </div>




          <label htmlFor="recap">Recap</label>
          <textarea id="recap" ref={(input) => this.recap = input}></textarea>

          <label htmlFor="home">{homeMvpLvp}</label>
          <textarea id="home" ref={(input) => this.homeMvpLvp = input}></textarea>

          <label htmlFor="away">{awayMvpLvp}</label>
          <textarea id="away" ref={(input) => this.awayMvpLvp = input}></textarea>

          <button>Add Matchup</button>
        </form>

      </div>
    )
  }
}

export default MatchupRecap;
