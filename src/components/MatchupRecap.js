import React from 'react';

class MatchupRecap extends React.Component {
  render(){
    return(
      <div className="matchup-recap">
        <h1>Matchup Recap</h1>
        <select className="home-team">
          <option>Select Home Team</option>
          <option value="thekesselrun">{"The Kessel Run"}</option>
          <option value="Wheelin N Nealin">{"Wheelin N Nealin"}</option>
          <option value="Gotta' Go Landeskoging">{"Gotta' Go Landeskoging"}</option>
          <option value="MayRay Trippers">{"MayRay Trippers"}</option>
          <option value="Toothless Zambronies">{"Toothless Zambronies"}</option>
          <option value="Lindsey's Legit Team">{"Lindsey's Legit Team"}</option>
          <option value="The Biloxi Frogs">{"The Biloxi Frogs"}</option>
          <option value="The Champion">{"The Champion"}</option>
          <option value="Toews'd And Confused">{"Toews'd And Confused"}</option>
          <option value="Losers say Roy?">{"Losers say Roy?"}</option>
        </select>

        <select className="away-team">
          <option>Select Away Team</option>
          <option value="thekesselrun">{"The Kessel Run"}</option>
          <option value="Wheelin N Nealin">{"Wheelin N Nealin"}</option>
          <option value="Gotta' Go Landeskoging">{"Gotta' Go Landeskoging"}</option>
          <option value="MayRay Trippers">{"MayRay Trippers"}</option>
          <option value="Toothless Zambronies">{"Toothless Zambronies"}</option>
          <option value="Lindsey's Legit Team">{"Lindsey's Legit Team"}</option>
          <option value="The Biloxi Frogs">{"The Biloxi Frogs"}</option>
          <option value="The Champion">{"The Champion"}</option>
          <option value="Toews'd And Confused">{"Toews'd And Confused"}</option>
          <option value="Losers say Roy?">{"Losers say Roy?"}</option>
        </select>


        <label htmlFor="title">Title</label>
        <input type="text" id="title"/>

      </div>
    )
  }
}

export default MatchupRecap;
