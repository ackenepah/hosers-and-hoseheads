import React from 'react';

class StagedMatchups extends React.Component {


  renderStages(key){
    const staged = this.props.staged[key];
    // console.log(staged , 'staged');

    return (
      <li key={key}>
        <span>{staged.homeTeam} vs {staged.awayTeam}</span>
      </li>
    )
  }

  render(){
    const divStyle = {background: 'lightGreen'};
    const h1style = {fontSize: '40px'}
    const stagedIds = Object.keys(this.props.staged)
    // console.log(stagedIds, "stagedIds");
    return (
      <div className="staged-matchups" style={divStyle}>
        <h1 style={h1style}>StagedMatchups</h1>
        <ul>
          {stagedIds.map(this.renderStages.bind(this))}
        </ul>
      </div>
    )
  }
}

export default StagedMatchups;
