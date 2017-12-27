import React from 'react';
import owners from '../owners';

class MatchupRecap extends React.Component {

  constructor(){
    super();

    this.handleTeamChange.bind(this);

    this.state = {
      homeMvpLvp: "",
      awayMvpLvp: ""
    }
  }

  handleTeamChange(type, e){
    e.preventDefault();
    this.setState({[type]: e.target.value})
  }

  render(){
    const homeMvpLvp = this.state.homeMvpLvp ? this.state.homeMvpLvp : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayMvpLvp ? this.state.awayMvpLvp : "Away Team MVP & LVP";


    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>

        select onChange={(e) => this.handleTeamChange('adrian')}

        <div className="home-team">
          <select className="home-team" onChange={(e) => this.handleTeamChange('homeMvpLvp', e)}>
            <option>Select Home Team</option>
            {Object.keys(owners).map(key => <option value={key}>{key}</option>)}
          </select>
          <input type="number"/>
        </div>

        <div className="away-team">
          <select className="away-team" onChange={(e) => this.handleTeamChange('awayMvpLvp', e)}>
            <option>Select Away Team</option>
            {Object.keys(owners).map(key => <option value={key}>{key}</option>)}
          </select>
          <input type="number"/>
        </div>




        <label htmlFor="recap">Recap</label>
        <textarea id="recap"></textarea>

        <label htmlFor="home">{homeMvpLvp}</label>
        <textarea id="home"></textarea>

        <label htmlFor="away">{awayMvpLvp}</label>
        <textarea id="away"></textarea>
      </div>
    )
  }
}

export default MatchupRecap;
