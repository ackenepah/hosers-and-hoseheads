import React from 'react';
import StagedMatchups from './StagedMatchups';
import '../css/keith.css';

class MatchupRecap extends React.Component {

  constructor(props){
    super(props);
    this.submitMatchupRecap = this.submitMatchupRecap.bind(this);
    this.editMatchupRecap = this.editMatchupRecap.bind(this);
    this.deleteMatchupRecap = this.deleteMatchupRecap.bind(this);
    this.clearForm = this.clearForm.bind(this);
    // this.handleTeamChange2 = this.handleTeamChange2.bind(this);
    this.state = {
      homeTeamDefault: "Home Team",
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: 0,
      awayTeamDefault: "Away Team",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: 0,
      recap: "",
      editing: false,
      editingKey: "",
      homeTeamShowing: false,
      awayTeamShowing: false

    }
  }

  handleTeamChange(type, e){

    this.setState({[type]: e.target.value})
  }


  handleTeamChange2(type, key){
    console.log(type, key);
    this.setState({[type]: key})
  }

  submitMatchupRecap(e){
    e.preventDefault();

    if(!this.state.homeTeam || !this.state.awayTeam){
      alert('no  home team or away team');
    } else if(this.state.homeTeam === this.state.awayTeam){
      alert('teams cannot be the same');
    } else if(this.state.editing === true){

      const editingMatchup = {
        recap: this.recap.value,
        homeTeam: this.state.homeTeam,
        homeTeamScore: this.homeTeamScore.value,
        homeMvpLvp: this.homeMvpLvp.value,
        awayTeam: this.state.awayTeam,
        awayTeamScore: this.awayTeamScore.value,
        awayMvpLvp: this.awayMvpLvp.value
      }
      this.setState({
        homeTeam: "",
        homeMvpLvp: "",
        homeTeamScore: "0",
        awayTeam: "",
        awayMvpLvp: "",
        awayTeamScore: "0",
        recap: "",
        editing: false,
        editingKey: ""
      })

      this.props.stagedMatchups.splice(this.state.editingKey, 1, editingMatchup)
      // const allStageMatchups = this.props.stagedMatchups.splice(this.state.editingKey, 1, stageMatchup)
      // this.props.handleStaged(allStageMatchups, 'edit')

    } else {

      const newMatchup = {
        recap: this.recap.value,
        homeTeam: this.state.homeTeam,
        homeTeamScore: this.homeTeamScore.value,
        homeMvpLvp: this.homeMvpLvp.value,
        awayTeam: this.state.awayTeam,
        awayTeamScore: this.awayTeamScore.value,
        awayMvpLvp: this.awayMvpLvp.value
      }

      this.setState({
        homeTeam: "",
        homeMvpLvp: "",
        homeTeamScore: "0",
        awayTeam: "",
        awayMvpLvp: "",
        awayTeamScore: "0",
        recap: "",
        editing: false,
        editingKey: ""
      })

      console.log(newMatchup, 'new matc');

      this.props.stagedMatchups.push(newMatchup)
      // this.props.handleStaged(stageMatchup, 'new')
    }
  }

  editMatchupRecap(matchup, key){
    this.setState({
      homeTeam: matchup.homeTeam,
      homeMvpLvp: matchup.homeMvpLvp,
      homeTeamScore: matchup.homeTeamScore,
      awayTeam: matchup.awayTeam,
      awayMvpLvp: matchup.awayMvpLvp,
      awayTeamScore: matchup.awayTeamScore,
      recap: matchup.recap,
      editing: true,
      editingKey: key
    })
  }

  deleteMatchupRecap(matchup, key){
    this.setState({
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: "0",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "0",
      recap: "",
      editing: false,
      editingKey: ""
    })

    this.props.stagedMatchups.splice(key, 1)
  }

  clearForm(){
    this.setState({
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: "0",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "0",
      recap: "",
      editing: false,
      editingKey: ""
    })
  }

  render(){
    const owners = {...this.props.owners}
    const homeMvpLvp = this.state.homeTeam ? this.state.homeTeam : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayTeam ? this.state.awayTeam : "Away Team MVP & LVP";
    const buttonText = this.state.editing ? "Edit Matchup" : "Add Matchup";
    const clearFormBtn = this.state.editing ? 'Cancel' : 'Clear';

    return(
      <div>
        <div>
          <h3>Matchup Recap</h3>
          <p>Select a home team and an away team and write the matchup!</p>
          <form className="matchup-form" ref={(input) => this.matchupRecapForm = input} onSubmit={this.submitMatchupRecap}>

          { /*  <div className="teams">

           <div className="home-team">
              <select className="home-team-select" onChange={(e) => this.handleTeamChange('homeTeam', e)} value={this.state.homeTeam}>
                <option> - Home Team - </option>
                {Object.keys(owners).map((key, ind) => { return <option key={ind} value={key}>{key}</option>})}
              </select>
              <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input} value={this.state.homeTeamScore} onChange={(e) => this.handleTeamChange('homeTeamScore', e)}/>
            </div>

            <div className="vs">VS.</div>

            <div className="away-team">
              <input type="number" min="0" max="10" ref={(input) => this.awayTeamScore = input} value={this.state.awayTeamScore} onChange={(e) => this.handleTeamChange('awayTeamScore', e)}/>

              <select className="away-team-select" onChange={(e) => this.handleTeamChange('awayTeam', e)} value={this.state.awayTeam}>
                <option> - Away Team - </option>
                {Object.keys(owners).map((key, ind) => { return <option key={ind} value={key}>{key}</option>})}
              </select>
            </div>

          </div> */ }

          <div className="teams">

            <div className="team">
              <div className="main" onClick={()=>{this.setState({homeTeamShowing:!this.state.homeTeamShowing})}}>
                {!this.state.homeTeam && <span className="dash"> </span>}{this.state.homeTeam || this.state.homeTeamDefault}{!this.state.homeTeam && <span className="dash"> </span>}
                {this.state.homeTeamShowing &&
                  <ul className="options">
                    {Object.keys(owners).map((key, ind) => { return <li onClick={()=>{this.handleTeamChange2('homeTeam', key) ; this.setState({homeTeamShowing:!this.state.homeTeamShowing})}} key={ind} value={key}>{key}</li>})}
                  </ul>
                }
              </div>

              <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input} value={this.state.homeTeamScore} onChange={(e) => this.handleTeamChange('homeTeamScore', e)}/>

            </div>

            <div className="vs">VS.</div>

            <div className="team">
              <input type="number" min="0" max="10" ref={(input) => this.awayTeamScore = input} value={this.state.awayTeamScore} onChange={(e) => this.handleTeamChange('awayTeamScore', e)}/>

              <div className="main" onClick={()=>{this.setState({awayTeamShowing:!this.state.awayTeamShowing})}}>
                {!this.state.awayTeam && <span className="dash"> </span>}{this.state.awayTeam || this.state.awayTeamDefault}{!this.state.awayTeam && <span className="dash"> </span>}
                {this.state.awayTeamShowing &&
                  <ul className="options">
                    {Object.keys(owners).map((key, ind) => { return <li onClick={()=>{this.handleTeamChange2('awayTeam', key) ; this.setState({awayTeamShowing:!this.state.awayTeamShowing})}} key={ind} value={key}>{key}</li>})}
                  </ul>
                }
              </div>

            </div>


          </div>



            <label htmlFor="recap">
              <h3>{homeMvpLvp} vs {awayMvpLvp}</h3>
              <p>{`Write an overview of the recap and a detailed paragraph for each team`}</p>
              <textarea id="recap" ref={(input) => this.recap = input} value={this.state.recap} onChange={(e) => this.handleTeamChange('recap', e)}></textarea>
            </label>

            <div className="mvp-lvp-container">


              <label htmlFor="home">
                <h3>{homeMvpLvp}</h3>
                <p>{`Write the home team's MVP and LVP`}</p>
                <textarea id="home" ref={(input) => this.homeMvpLvp = input} value={this.state.homeMvpLvp} onChange={(e) => this.handleTeamChange('homeMvpLvp', e)}></textarea>

              </label>

              <div className="gutter"></div>

              <label htmlFor="away">
                <h3>{awayMvpLvp}</h3>
                <p>{`Write the away team's MVP and LVP`}</p>
                <textarea id="away" ref={(input) => this.awayMvpLvp = input} value={this.state.awayMvpLvp} onChange={(e) => this.handleTeamChange('awayMvpLvp', e)}></textarea>

              </label>


            </div>

            <div className="mr-button-container">
              <button>{buttonText}</button>
              <button type="button" onClick={this.clearForm}>{clearFormBtn}</button>
            </div>
          </form>
          <StagedMatchups staged={this.props.stagedMatchups} editMatchupRecap={this.editMatchupRecap} deleteMatchupRecap={this.deleteMatchupRecap}/>

        </div>


      </div>
    )
  }
}

// <StagedMatchups staged={this.props.stagedMatchups} editMatchupRecap={this.editMatchupRecap} deleteMatchupRecap={this.deleteMatchupRecap}/>
// <span onClick={()=>{this.setState({homeTeam: ""})}}>
// {this.state.homeTeam || this.state.homeTeamDefault} " ha"
// </span>

export default MatchupRecap;
