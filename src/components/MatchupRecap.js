import React from 'react';
import own from '../owners'
import StagedMatchups from './StagedMatchups';

class MatchupRecap extends React.Component {

  constructor(props){
    super(props);
    this.submitMatchupRecap = this.submitMatchupRecap.bind(this);
    this.editMatchupRecap = this.editMatchupRecap.bind(this);
    this.deleteMatchupRecap = this.deleteMatchupRecap.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.state = {
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: "",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "",
      recap: "",
      editing: false,
      editingKey: "",
      ownersA: own,
      ownersB: own
    }
  }

  diffArray(arr1, arr2) {
    var newArr = [];
    var myArr = arr1.concat(arr2);

      newArr = myArr.filter(function(item){
        return arr2.indexOf(item) < 0 || arr1.indexOf(item) < 0;
      });
     console.log(newArr, 'diffArray function');
     return newArr
  }

  handleTeamChange(type, e){
    // // this.setState({[type]: e.target.value})
    // const newStateA = Object.keys({...this.state.ownersA})
    // const newStateB = Object.keys({...this.state.ownersB})
    const newStateA = {...this.state.ownersA}
    const newStateB = {...this.state.ownersB}

    console.log(newStateA);

    if(type === 'homeTeam'){

      for(var ht in newStateA){
        if(e.target.value === ht){
          console.log('found' + ht);
          delete newStateB[ht]
        }
      }
      this.setState({[type]: e.target.value, ownersB: newStateB})
    } else if(type === 'awayTeam'){
      for(var at in newStateB){
        if(e.target.value === at){
          delete newStateA[at]
        }
      }
      this.setState({[type]: e.target.value, ownersA: newStateA})
    }
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
        homeTeamScore: "",
        awayTeam: "",
        awayMvpLvp: "",
        awayTeamScore: "",
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

      const newStateA = {...this.state.ownersA}
      const newStateB = {...this.state.ownersB}


        for(var ht in newStateA){
          if(newMatchup.homeTeam === ht){
            console.log('found' + ht);
            delete newStateA[ht]
          }
        }
        // this.setState({[type]: e.target.value, ownersB: newStateB})
        for(var at in newStateB){
          if(newMatchup.awayTeam === at){
            delete newStateB[at]
          }
        }
        // this.setState({[type]: e.target.value, ownersA: newStateA})

      this.setState({
        homeTeam: "",
        homeMvpLvp: "",
        homeTeamScore: "",
        awayTeam: "",
        awayMvpLvp: "",
        awayTeamScore: "",
        recap: "",
        editing: false,
        editingKey: "",
        ownersA: newStateA,
        ownersB: newStateB
      })

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
      homeTeamScore: "",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "",
      recap: "",
      editing: false,
      editingKey: ""
    })

    this.props.stagedMatchups.splice(key, 1)
    // const stageMatchup = this.props.stagedMatchups
    // stageMatchup.splice(key, 1)
    // this.props.handleStaged(stageMatchup, 'delete')
  }

  clearForm(){
    this.setState({
      homeTeam: "",
      homeMvpLvp: "",
      homeTeamScore: "",
      awayTeam: "",
      awayMvpLvp: "",
      awayTeamScore: "",
      recap: "",
      editing: false,
      editingKey: ""
    })
  }

  componentDidUpdate(){
    // console.log(this.state.ownersB, "componentDidUpdate");
    // console.log(own);
  }


  render(){
    // const owners = {...this.props.owners}
    const homeMvpLvp = this.state.homeTeam ? this.state.homeTeam : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayTeam ? this.state.awayTeam : "Away Team MVP & LVP";
    const buttonText = this.state.editing ? "Edit Matchup" : "Add Matchup";
    const clearFormBtn = this.state.editing ? 'Cancel' : 'Clear';

    // DELETE OWNERS FROM OPTIONS LIST
    // for(var team in owners) {
    //   if(this.state.homeTeam === team) {
    //     delete owners[team]
    //   }
    // }

    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>
        <form ref={(input) => this.matchupRecapForm = input} onSubmit={this.submitMatchupRecap}>

          <div className="home-team">
            <select className="home-team-select" onChange={(e) => this.handleTeamChange('homeTeam', e)} value={this.state.homeTeam}>
              <option>Select Home Team</option>
              {Object.keys(this.state.ownersA).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input} value={this.state.homeTeamScore} onChange={(e) => this.handleTeamChange('homeTeamScore', e)}/>
          </div>

          <div className="away-team">
            <select className="away-team-select" onChange={(e) => this.handleTeamChange('awayTeam', e)} value={this.state.awayTeam}>
              <option>Select Away Team</option>
              {Object.keys(this.state.ownersB).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.awayTeamScore = input} value={this.state.awayTeamScore} onChange={(e) => this.handleTeamChange('awayTeamScore', e)}/>
          </div>


          <label htmlFor="recap">Recap</label>
          <textarea id="recap" ref={(input) => this.recap = input} value={this.state.recap} onChange={(e) => this.handleTeamChange('recap', e)}></textarea>

          <label htmlFor="home">{homeMvpLvp}</label>
          <textarea id="home" ref={(input) => this.homeMvpLvp = input} value={this.state.homeMvpLvp} onChange={(e) => this.handleTeamChange('homeMvpLvp', e)}></textarea>

          <label htmlFor="away">{awayMvpLvp}</label>
          <textarea id="away" ref={(input) => this.awayMvpLvp = input} value={this.state.awayMvpLvp} onChange={(e) => this.handleTeamChange('awayMvpLvp', e)}></textarea>

          <button>{buttonText}</button>
          <button type="button" onClick={this.clearForm}>{clearFormBtn}</button>
        </form>

        <StagedMatchups staged={this.props.stagedMatchups} editMatchupRecap={this.editMatchupRecap} deleteMatchupRecap={this.deleteMatchupRecap}/>

      </div>
    )
  }
}

export default MatchupRecap;
