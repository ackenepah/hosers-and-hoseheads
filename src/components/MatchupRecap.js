import React from 'react';
import owners from '../owners';

import StagedMatchups from './StagedMatchups';

class MatchupRecap extends React.Component {

  constructor(){
    super();

    this.submitMatchupRecap = this.submitMatchupRecap.bind(this);
    this.setMatchupRecap = this.setMatchupRecap.bind(this);
    this.state = {
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: "",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "",
      recap: "",

      stageMatchup: []
    }
  }

  handleTeamChange(type, e){
    this.setState({[type]: e.target.value})
  }

  submitMatchupRecap(e){
    e.preventDefault();

    if(!this.state.homeTeam || !this.state.awayTeam){
      alert('no  home team or away team');
    } else if(this.state.homeTeam === this.state.awayTeam){
      alert('teams cannot be the same');
    } else {
      const stageMatchup = {
        recap: this.recap.value,
        homeTeam: this.state.homeTeam,
        homeTeamScore: this.homeTeamScore.value,
        homeMvpLvp: this.homeMvpLvp.value,
        awayTeam: this.state.awayTeam,
        awayTeamScore: this.awayTeamScore.value,
        awayMvpLvp: this.awayMvpLvp.value
      }
      //use spread operator to grab current state (array) and add the stageMatchup object to it
      this.setState({
        stageMatchup: [...this.state.stageMatchup, stageMatchup],
        homeTeam: "",
        homeMvpLvp: "",
        homeTeamScore: "",
        awayTeam: "",
        awayMvpLvp: "",
        awayTeamScore: "",
        recap: ""
      })
      this.matchupRecapForm.reset();
    }
  }



  setMatchupRecap(matchup){
    console.log(matchup, 'matchup lol');
    this.setState({
      homeTeam: matchup.homeTeam,
      homeMvpLvp: matchup.homeMvpLvp,
      homeTeamScore: matchup.homeTeamScore,
      awayTeam: matchup.awayTeam,
      awayMvpLvp: matchup.awayMvpLvp,
      awayTeamScore: matchup.awayTeamScore,
      recap: matchup.recap
    })
  }

  componentDidUpdate(){
    // console.log(this.state.homeTeam, "componentDidUpdate");
  }

  render(){
    const homeMvpLvp = this.state.homeTeam ? this.state.homeTeam : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayTeam ? this.state.awayTeam : "Away Team MVP & LVP";


    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>
        <form ref={(input) => this.matchupRecapForm = input} onSubmit={this.submitMatchupRecap}>

          <div className="home-team">
            <select className="home-team-select" onChange={(e) => this.handleTeamChange('homeTeam', e)} value={this.state.homeTeam}>
              <option>Select Home Team</option>
              {Object.keys(owners).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input} value={this.state.homeTeamScore} onChange={(e) => this.handleTeamChange('homeTeamScore', e)}/>
          </div>

          <div className="away-team">
            <select className="away-team-select" onChange={(e) => this.handleTeamChange('awayTeam', e)} value={this.state.awayTeam}>
              <option>Select Away Team</option>
              {Object.keys(owners).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.awayTeamScore = input} value={this.state.awayTeamScore} onChange={(e) => this.handleTeamChange('awayTeamScore', e)}/>
          </div>


          <label htmlFor="recap">Recap</label>
          <textarea id="recap" ref={(input) => this.recap = input} value={this.state.recap} onChange={(e) => this.handleTeamChange('recap', e)}></textarea>

          <label htmlFor="home">{homeMvpLvp}</label>
          <textarea id="home" ref={(input) => this.homeMvpLvp = input} value={this.state.homeMvpLvp} onChange={(e) => this.handleTeamChange('homeMvpLvp', e)}></textarea>

          <label htmlFor="away">{awayMvpLvp}</label>
          <textarea id="away" ref={(input) => this.awayMvpLvp = input} value={this.state.awayMvpLvp} onChange={(e) => this.handleTeamChange('awayMvpLvp', e)}></textarea>

          <button>Add Matchup</button>
        </form>

        <StagedMatchups staged={this.state.stageMatchup} setMatchupRecap={this.setMatchupRecap}/>

      </div>
    )
  }
}

export default MatchupRecap;