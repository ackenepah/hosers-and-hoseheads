import React from 'react';
class StagedMatchups extends React.Component {


  renderStages(item, key){
    const liStyle = {width: '100%', border: '1px solid black', padding: "2px"}
    const staged = item;
    // const staged = this.props.staged[key];
    // console.log(staged , 'staged');
    return (
      <li key={key} style={liStyle}>
        <span onClick={(e) => {this.props.editMatchupRecap(staged, key)}}> {staged.homeTeam} vs {staged.awayTeam}</span> | <span onClick={(e) => {this.props.deleteMatchupRecap(staged, key)}}> X </span>
      </li>
    )
  }


  render(){
    const divStyle = {background: 'lightGreen'};
    const h1style = {fontSize: '40px'}
    const ulStyle = {width: '400px', background: 'yellow', minHeight: '500px'}

    // const stagedIds = Object.keys(this.props.staged)
    // console.log(stagedIds, 'stagied');
    return (
      <div className="staged-matchups" style={divStyle}>
        <h1 style={h1style}>StagedMatchups</h1>
        <ul style={ulStyle}>
          {this.props.staged.map(this.renderStages.bind(this))}
        </ul>
      </div>
    )
  }
}
// {stagedIds.map(this.renderStages.bind(this))}

export default StagedMatchups;
