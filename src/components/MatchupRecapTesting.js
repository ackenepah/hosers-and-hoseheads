import React from 'react';
import own from '../owners';
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
      editingKey: ""//,
      // ownersA: Object.keys(own),
      // ownersB: Object.keys(own)
    }
  }

  differenceOf2Arrays (array1, array2, team) {
      let newString = "";
      let arrNum = ""
      // for (var i in array1) {
      //   if(array2.indexOf(array1[i]) === -1) {
      //     newString = array1[i];
      //     arrNum = "1"
      //     console.log(newString, '1');
      //
      //   }
      // }
      // for(i in array2) {
      //   if(array1.indexOf(array2[i]) === -1) {
      //     newString = array2[i];
      //     arrNum = "2"
      //
      //     console.log(newString, '2');
      //   }
      // }

      for (var i = 0; i < array1.length; i++) {
        // console.log(array2.indexOf(array1[i]));
          if(array2.indexOf(array1[i]) === -1) {
            newString = array1[i];
            arrNum = "1";
            console.log(newString, '1');
          }
      }

      for (var j = 0; j < array2.length; j++) {
          if(array1.indexOf(array2[j]) === -1) {
            newString = array2[j];
            arrNum = "2";
            console.log(newString, '2');

          }
      }

      // if(team === 'awayTeam'){
      //   console.log('getting here');
      //   array2.push(newString)
      //   return array2
      // } else if(team === 'homeTeam'){
      //   array1.push(newString)
      //   return array1
      // }
      if(newString){
        // array2.push(newString)
        // newString = "";
        // console.log(array2);
        // return array2
        // if(team === 'awayTeam'){
        //   console.log('pushing away team');
        //   // array2.push(temp.toString())
        //   array2.push(newString)
        //   return array2
        // } else if(team === 'homeTeam'){
        //   console.log('pushing HOME team');
        //
        //   array2.push(newString)
        //   return array2
        // }
        if(arrNum === '2'){
          console.log('pushing 2 team');
          // array2.push(temp.toString())
          array1.push(newString);
          return array1;
        } else if(arrNum === '1'){
          console.log('pushing 1 team');

          array2.push(newString);
          return array2;
        }
      }


  }

  handleTeamChange(type, e){
    this.setState({[type]: e.target.value})

    // const newStateA = [...this.state.ownersA];
    // const newStateB = [...this.state.ownersB];
    //
    // if(type === 'homeTeam'){
    //   // this.differenceOf2Arrays(newStateA, newStateB, type);
    //
    //   const htInd = newStateB.indexOf(e.target.value);
    //   newStateB.splice(htInd, 1);
    //
    // } else if(type === 'awayTeam'){
    //
    //   // this.differenceOf2Arrays(newStateA, newStateB, type);
    //   const atInd = newStateA.indexOf(e.target.value);
    //   newStateA.splice(atInd, 1);
    // }
    //
    // this.setState({[type]: e.target.value, ownersB: newStateB, ownersA: newStateA})

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

      // const newStateA = {...this.state.ownersA}
      // const newStateB = {...this.state.ownersB}
      //
      //
      //   for(var ht in newStateA){
      //     if(newMatchup.homeTeam === ht){
      //       console.log('found' + ht);
      //       delete newStateA[ht]
      //     }
      //   }
      //   // this.setState({[type]: e.target.value, ownersB: newStateB})
      //   for(var at in newStateB){
      //     if(newMatchup.awayTeam === at){
      //       delete newStateB[at]
      //     }
      //   }
      //  // this.setState({[type]: e.target.value, ownersA: newStateA})

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
    // const ownersA = {...this.state.ownersA};
    // const ownersB = {...this.state.ownersB};
    //
    // ownersA[matchup.awayTeam] = own[matchup.awayTeam];
    // ownersA[matchup.homeTeam] = own[matchup.homeTeam];
    // ownersB[matchup.awayTeam] = own[matchup.awayTeam];
    // ownersB[matchup.homeTeam] = own[matchup.homeTeam];

    // console.log(own[matchup.homeTeam], 'ownmh');
    // console.log(ownersA, 'a');
    // console.log(ownersB, 'b');
    // SORTING NOT WORKING - PUSHES TO END OF OBJECT
    // sortObject(ownersA); //sort coming from helpers.js
    // console.log(ownersA, 'aa');

    // this.setState({ownersA, ownersB})

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
    // console.log(this.state.ownersA, "componentDidUpdate");
    // console.log(own);
  }


  render(){
    const owners = {...this.props.owners}
    const homeMvpLvp = this.state.homeTeam ? this.state.homeTeam : "Home Team MVP & LVP";
    const awayMvpLvp = this.state.awayTeam ? this.state.awayTeam : "Away Team MVP & LVP";
    const buttonText = this.state.editing ? "Edit Matchup" : "Add Matchup";
    const clearFormBtn = this.state.editing ? 'Cancel' : 'Clear';

    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>
        <form ref={(input) => this.matchupRecapForm = input} onSubmit={this.submitMatchupRecap}>

          <div className="home-team">
            <select className="home-team-select" onChange={(e) => this.handleTeamChange('homeTeam', e)} value={this.state.homeTeam}>
              <option>Select Home Team</option>
              {Object.keys(owners).map((key, ind) => { return <option key={ind} value={key}>{key}</option>})}
              {/* {this.state.ownersA.map((key, ind) => { console.log('getting here hahahaah');return <option key={ind} value={key}>{key}</option>})} */}
            </select>
            <input type="number" min="0" max="10" ref={(input) => this.homeTeamScore = input} value={this.state.homeTeamScore} onChange={(e) => this.handleTeamChange('homeTeamScore', e)}/>
          </div>

          <div className="away-team">
            <select className="away-team-select" onChange={(e) => this.handleTeamChange('awayTeam', e)} value={this.state.awayTeam}>
              <option>Select Away Team</option>
              {Object.keys(owners).map((key, ind) => { return <option key={ind} value={key}>{key}</option>})}

              {/*{this.state.ownersB.map((key, ind) => { return <option key={ind} value={key}>{key}</option>})}*/}
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
