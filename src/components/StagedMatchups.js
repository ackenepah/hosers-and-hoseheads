import React from 'react';
class StagedMatchups extends React.Component {


  renderStages(key){
    const staged = this.props.staged[key];
    // console.log(staged , 'staged');
    const liStyle = {width: '100%', border: '1px solid black'}

    return (
      <li key={key} style={liStyle}>
        <span onClick={(e) => {this.props.editMatchupRecap(staged, key)}}> {staged.homeTeam} vs {staged.awayTeam}</span> | <span onClick={(e) => {this.props.deleteMatchupRecap(staged, key)}}> X </span>
      </li>
    )
  }


  render(){
    const divStyle = {background: 'lightGreen'};
    const h1style = {fontSize: '40px'}
    const stagedIds = Object.keys(this.props.staged)
    // console.log(stagedIds, "stagedIds");
    const ulStyle = {width: '400px', background: 'yellow'}

    return (
      <div className="staged-matchups" style={divStyle}>
        <h1 style={h1style}>StagedMatchups</h1>
        <ul style={ulStyle}>
          {stagedIds.map(this.renderStages.bind(this))}
        </ul>
      </div>
    )
  }
}

export default StagedMatchups;
