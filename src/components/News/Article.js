import React from 'react';

class Article extends React.Component {
  render() {

    console.log(this.props.details);
    const d = this.props.details

    return(
      <div className="article-wrapper">
        <div className="article">
          <div className="article-info">
            <span className="article-category">Weekly Recap</span>
            <h1 className="article-headline">{d.title}</h1>
            <h2 className="article-sub-headline">{d.summary}</h2>
            <p className="article-contributor">by <a href="#">Adrian Kenepah-Martin</a></p>

            <div className="article-meta">
              <span className="article-date">Jan 1, 2017</span>
            </div>
          </div>

          <div className="article-img">
            <img src={d.image} alt={d.title}/>
          </div>

          <div className="article-post">
            <div className="article-body">
              <p>{d.articleIntro}</p>

              <h4>Current Standings:</h4>
              <ol className="standings-list">
                <p>List the current stadings.</p>
              </ol>

              <p>{d.matchupIntro}</p>

              <h3>Matchup Title</h3>
              <span className="score">Da Score</span>
              <p>Matchup Overview</p>
              <p>Away Team Recap</p>
              <p>Home Team Recap</p>
              <h4>AWAYTEAM MVP & LVP</h4>
              <p>MVP Recap</p>
              <p>LVP Recap</p>
              <h4>HOMETEAM MVP & LVP</h4>
              <p>MVP Recap</p>
              <p>LVP Recap</p>
            </div>
            <button>View More</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Article;




//   <div className="article-wrapper">
//     <div className="article">
//       <div className="article-info">
//         <span className="article-category">Weekly Recap</span>
//         <h1 className="article-headline">Week 12 Recap</h1>
//         <h2 className="article-sub-headline">Hudson Bay maple syrup for beaver eats of all Hudson Bay on this plaid flannel Ogopogo gasbar. Tim Hortons pogey too parkade to the bacon, and its Mounted Police.</h2>
//         <p className="article-contributor">by <a href="#">Adrian Kenepah-Martin</a></p>
//
//         <div className="article-meta">
//           <span className="article-date">Jan 1, 2017</span>
//         </div>
//       </div>
//
//       <div className="article-img">
//         <img src="https://nhl.bamcontent.com/images/photos/294137372/2048x1152/cut.jpg" />
//       </div>
//
//       <div className="article-post">
//         <div className="article-body">
//           <p>Week 10 is coming to a bitter end and I find myself appreciating the inspiration that I felt when I wrote my first recap of this league. The truth is cheesy, but I recently watched episode one of the 2017 Road to the Winter Classic. The Road to the Winter Classic is a short series that builds up to one of the most iconic games in the history of hockey. It reminded me of why I write these recaps; to spark inspiration and excitement for the sport of hockey, but also to talk shit.</p>
//
//           <p>Per usual the standings are listed below. You’ll notice the Toews’d and Confused franchise has been dismantled from their pedestal. No longer will Brian be on his throne looking down upon us all Calder Cup Candidate in Clayton Keller. No longer will Brian be a threat to every team in the league. His hopes of winning Lord Stanley is slowly diminishing as his dynasty is falling apart. I know, it’s one game, but he lost 6 - 3 to Nic.</p>
//
//           <h4>Current Standings:</h4>
//           <ol className="standings-list">
//             <li>MayRay Trippers (<span className="points">95 pts</span>)</li>
//             <li>Toothless Zambronies (<span className="points">88 pts</span>)</li>
//             <li>The Biloxi Frogs (<span className="points">93 pts</span>)</li>
//             <li>Toewsd and Confused (<span className="points">92 pts</span>)</li>
//             <li>The Champion (<span className="points">80 pts</span>)</li>
//             <li>Lindseys Legit Team (<span className="points">95 pts</span>)</li>
//             <li>Wheelin N Dealin (<span className="points">77 pts</span>)</li>
//             <li>Gotta Go Landeskoging (<span className="points">70 pts</span>)</li>
//             <li>The Kessel Run (<span className="points">69 pts</span>)</li>
//             <li>Losers Say Roy (<span className="points">68 pts</span>)</li>
//           </ol>
//
//           <p>As you can see, Brandon, the league’s very own Sacko, has taken his MayRay Trippers to the top of the standings. The rookie GM running the Toothless Zambronies has somehow pushed his way into 2nd place after having a huge win over The Kessel Run. Bryce, who’s running The Biloxi Frogs, is sitting right above Brian’s dying dynasty with 93 points. Let’s dive into the matchups to see how everything unfolded!</p>
//
//           <h3>Gotta Go Landeskoging vs. MayRay Trippers</h3>
//           <span className="score">BRANDON WINS 5 - 3</span>
//           <p>The MayRay Trippers took a trip to Chicago to take on Matt and his team of players who enjoy Landeskoging. It was a rough start for Matt’s team in net, though, as he called up Anton Khudobin from the league’s free agency. Only Matt knows why he did that when he had 2, well, 1 solid starter in Andrei Vasilevskiy (I’ve been spelling his name wrong this entire time). It’s possible he took a chance on Khudobin because Cam Talbot has been sitting on IR since November 30th with an “upper body” injury. Although, even with Khudobin’s horrendous start (a 9.93 GAA and a .714 SV%) Matt somehow bounced back and was able to hold Brandon to only winning 2 out of the 4 goalie categories.</p>
//           <p>Matt, your team was relentless in shooting the puck. You had 9 skaters who had 10+ shots on goal for the week. That’s over half your team who just threw whatever they could at the net. I am pretty sure your total of 141 shots on goal has broken a record in The League of Extraordinary Hosers. Unfortunately, some of the players who threw most of those shots on goal couldn’t get a point to save their life which is why Brandon took 3 of the offensive categories from you. With Vasilevskiy and Lehner bailing out Khudobin throughout the work you were able to hold Brandon to only taken 5 categories.</p>
//           <p>This was a huge victory for you, Brandon. It was only a matter of time that you took a shot at taking the number one spot in the league. Hats off to you for really turning your GM career around. It feels like just yesterday when you earned your nickname as the league’s Sacko in 2014. Brayden Schenn continues to be a dominant force to you winning matchups. He posted 7 points (6 goals, 1 assist), 6 penalty minutes, 1 power play point, and 12 shots on goal in 4 games. Being on a top line in St. Louis with Vladimir Tarasenko and Jaden Schwartz really pays off. Not much else I can say about your team other than you’ve built a group of hockey players that seem to have each other backs when needed. Where one hockey player may lack another hockey player will pick up the slack.</p>
//           <h4>Gotta Go Landeskoging MVP & LVP</h4>
//           <p>The MVP Award goes to Vincent Trocheck. Even though his 6 points (2 goals, 4 assists) and 4 power play points didn’t help you win in those categories he was still a dominant force.</p>
//           <p>The LVP Award goes to Anton Khudobin. Even though he only had one start during the week, that one start cost you this matchup. Without Khudobin you potentially could have beaten Brandon in goalie stats. Does it hurt knowing you made the chose to start him?</p>
//           <h4>MayRay Trippers MVP & LVP</h4>
//           <p>The MVP Award goes to Joe Thornton. He’s kind of the unsung hero in this one. His 3 power play points were a significant reason you took that category away from Matt.</p>
//           <p>The LVP Award goes to Victor Hedman. His 5 shots on goal and 2 penalty minutes had no bearing on you winning this matchup.</p>
//         </div>
//         <button>View More</button>
//       </div>
//     </div>
//   </div>
// )
