import React from 'react';

class StagedMatchups extends React.Component {

  renderStages(staged, key){
    return (
      <li key={key}>
        <div className="staged" onClick={(e) => {this.props.editMatchupRecap(staged, key)}}> {staged.homeTeam} vs {staged.awayTeam}</div>
        <div className="delete" onClick={(e) => {this.props.deleteMatchupRecap(staged, key)}}>
          <div className="hoverRemove">Remove</div>
          X
        </div>
      </li>
    )
  }

  render(){
    return (
      <div className="staged-matchups">
        <h3>StagedMatchups</h3>
        <ul>
          {this.props.staged.map(this.renderStages.bind(this))}
        </ul>
      </div>
    )
  }
}

export default StagedMatchups;
