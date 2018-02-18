import React from 'react';
import base, {rebaseAuth} from '../config';
import MatchupRecap from './MatchupRecap';
import Header from './Header';
import Login from './Login';
import Modal from './Modal';
import ArticleView from './ArticleView';

import '../css/adrian.css';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.handleStaged = this.handleStaged.bind(this);
    this.getTeamPoints = this.getTeamPoints.bind(this);
    this.updateComponent = this.updateComponent.bind(this);
    // this.handleAuth = this.handleAuth.bind(this);

    this.state = {
      user: {
        name: '',
        image: ''
      },
      recaps: {
        title: '',
        summary: '',
        image: '',
        article_intro: '',
        match_intro: '',
        standings: {},
        matchup_recaps: [],
        post_date: ''
      },
      staged_standings: {},
      subStaged_standings: {},

      staged_matchups: [],
      owners: {},
      // modals: {
      //   noMatchupsModal: false
      // }
      modalNoMatchups: false,
      // modalNoMatchupsText: ''
      modalSubmitSuccess: false,
      component: "newPost"
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/posts`, {
      context: this,
      state: 'recaps'
    })

    this.ref2 = base.syncState(`/owners`, {
      context: this,
      state: 'owners'
    })

    base.fetch('/owners', {
      context: this,
      then(data){
        this.setState({staged_standings: data})
      }
    });
  }

  submitRecap(e, staged){
    console.log("submitting recap");
    e.preventDefault()
    if(this.state.staged_matchups && this.state.staged_matchups.length <= 0){
      // alert("please select at least one matchpp")
      // const text = "Please select at least one matchup before submitting";
      // this.setState({modalNoMatchups: !this.state.modalNoMatchups, modalNoMatchupsText: text})
      this.setState({modalNoMatchups: !this.state.modalNoMatchups})

    } else {
      // const nutext = "Your post has been submitted!";
      const timeStamp = Date.now();
      const newRecap = {...this.state.new_recap};
      const recap = {
        title: this.title.value,
        summary: this.summary.value,
        image: this.image.value,
        article_intro: this.articleIntro.value,
        matchup_intro: this.matchupIntro.value,
        // standings: {
        //   team: this.teamName.value,
        //   points: this.teamPoints.value,
        // },
        standings: this.state.subStaged_standings,
        matchup_recaps: this.state.staged_matchups,
        post_date: timeStamp
      }
      newRecap[`recap-${timeStamp}`] = recap;
      // console.log(nutext, 'text in submit');
      // this.setState({recaps: newRecap, staged_matchups: [], modalNoMatchups: !this.state.modalNoMatchups, modalNoMatchupsText: nutext})
      this.setState({recaps: newRecap, staged_matchups: [], modalSubmitSuccess: !this.state.modalSubmitSuccess})


      this.mainForm.reset();
    }
  }

  handleStaged(matchup_recaps, type){
    //this function is not needed - data is being manipulated directly in MatchupRecap component

    // if(type === 'new'){
    //   console.log('ADDING NEW!!!');
    //   const currentState = this.state.staged_matchups.concat(matchup_recaps)
    //   console.log(currentState, 'currentState');
    //   this.setState({staged_matchups: currentState});
    // } else if (type === 'edit'){
    //   console.log('ediitng hahah');
    // } else if (type === 'delete'){
    //   console.log('DELETINGGGG');
    // }
  }

  getTeamPoints(index, e) {
    const subStandingsCopy = [...this.state.subStaged_standings]
    let teamFound = false;
    let teamFoundIndex = "";

    for(var i = 0; i < subStandingsCopy.length; i++){
      if (e.target.name === subStandingsCopy[i].team){
        teamFound = true;
        teamFoundIndex = i;
      }
    }

    if(e.target.value && teamFound){

      subStandingsCopy[teamFoundIndex].points = e.target.value;
      subStandingsCopy.sort((a, b) =>{
        return b.points - a.points;
      })
      this.setState({subStaged_standings: subStandingsCopy})

    } else if (e.target.value){
      var team = {
        team: e.target.name,
        points: e.target.value
      }

      subStandingsCopy.push(team)
      subStandingsCopy.sort((a, b) =>{
        return b.points - a.points;
      })

      this.setState({subStaged_standings: subStandingsCopy})
    }
  }

  renderStandings(index) {
    const team = this.state.subStaged_standings

    return <li key={index}>{team[index].team} <span>{team[index].points} PTS</span></li>
  }

  updateComponent(type){
    this.setState({component: type})
  }
  componentDidUpdate(){
    console.log(this.state.staged_matchups, "this.matchups");
  }

  render() {
    console.log(rebaseAuth.currentUser, 'currentUser');
    if(!rebaseAuth.currentUser){
      return <Login pathname={this.props.location.pathname} handleAuth={this.props.handleAuth}/>
    }
      return (
        <div>
          <Header
            admin={this.props.admin}
            logout={this.props.logout}
            updateAdmin={this.props.updateAdmin}
            emailError={this.props.emailError}
            toggleEmailError={this.props.toggleEmailError}
            />

            <div>
              <button onClick={()=>{this.setState({component: "articleView"})}}>Articles </button>
              <button onClick={()=>{this.setState({component: "newPost"})}}>New Post</button>
            </div>

            { this.state.component === "newPost" ?

            <div>
              <form id="main-form" onSubmit={(e) => this.submitRecap(e)} ref={(input) => {this.mainForm = input}}>
                <div className="container light">
                  <div className="form-content flex-column">
                    <div className="flex-row">
                      <div className="col">
                        <h3>Post Title</h3>
                        <p>(i.e. Week 1 Recap)</p>
                        <input ref={(input) => this.title = input} type="text" placeholder="Week 1 Recap" />
                      </div>

                      <div className="col">
                        <h3>Post Summary</h3>
                        <p>(i.e Brandon will always be the league’s Sacko)</p>
                        <input ref={(input) => this.summary = input} type="text" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
                      </div>
                    </div>

                    <div className="flex-row" style={{background:"red"}}>
                      <div className="col img-post">
                        <h3>Image URL</h3>
                        <p>Copy and paste the image URL from imgur.com.</p>
                        <input ref={(input) => this.image = input} type="text" name="Article Image" accept="image/*" />
                      </div>

                      <div className="col">
                        <img src="http://www.placehold.it/460x200" alt="Article" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container dark">
                   <div className="form-content flex-row">
                     <div className="col">
                      <h3>Post Intro</h3>
                      <p>Write an overall summary of the week.</p>
                      <textarea ref={(input) => this.articleIntro = input} type="text" name="Article Intro" />
                     </div>

                     <div className="col">
                      <h3>Matchups Intro</h3>
                      <p>Highlight some big moments in the matchups.</p>
                      <textarea ref={(input) => this.matchupIntro = input} type="text" name="Match Intro" />
                     </div>
                   </div>
                </div>

                <div className="container light">
                  <div className="form-content flex-row standings">
                    <div className="col">
                      <h3>Update Standings</h3>
                      <p>Add the points each team has and the staged standings will update automatically.</p>
                      <ul>
                        {
                          Object.keys(this.state.staged_standings)
                                .map((item, index) => { return <li key={index} className="flex-row"> { item } <input type="number" name={item} onBlur={(e) => this.getTeamPoints(index, e)} /></li> })
                        }
                      </ul>
                    </div>

                    <div className="col">
                      <ol>
                        {
                          Object.keys(this.state.subStaged_standings)
                                .map(this.renderStandings.bind(this))
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              </form>

              <div className="container dark">
                <div className="form-content flex-column">
                  <MatchupRecap handleStaged={this.handleStaged} stagedMatchups={this.state.staged_matchups} owners={this.state.owners} />

                  { /* user "form=" to submit the main form from outside the form element .. cannot nest form inside form (matchup recap)*/}
                  <button form="main-form">Publish Post</button>
                </div>
              </div>
              {/*
              <Modal
                isOpen={this.state.modalNoMatchups}
                close={()=>{this.setState({modalNoMatchups: !this.state.modalNoMatchups})}}
                showClose={true}
              >
                <h1>{this.state.modalNoMatchupsText}</h1>
              </Modal>
              */}


              {/*
                /////////// MODALS ///////////
              */}

              <Modal
                isOpen={this.state.modalNoMatchups}
                close={()=>{this.setState({modalNoMatchups: !this.state.modalNoMatchups})}}
                showClose={true}
              >
                <h1>Please select at least one matchup before submitting</h1>
              </Modal>

              <Modal
                isOpen={this.state.modalSubmitSuccess}
                close={()=>{this.setState({modalSubmitSuccess: !this.state.modalSubmitSuccess})}}
                showClose={true}
              >
                <h1>Your post has successfully been submitted</h1>
              </Modal>
            </div>
          :
            <ArticleView />
        }
        </div>
      )
  }
}

export default Admin;

// <div className="admin-post">
//   <form onSubmit={(e) => this.submitRecap(e)} ref={(input) => {this.mainForm = input}}>
//     <div className="admin-article-dets">
//       <div className="admin-article-desc">
//         <label>Post Title</label>
//         <input ref={(input) => this.title = input} type="text" placeholder="Week 1 Recap" />
//
//         <label>Post Summary</label>
//         <input ref={(input) => this.summary = input} type="text" name="Summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
//       </div>
//       <div className="admin-article-image">
//         <label>Post Image</label>
//         <input ref={(input) => this.image = input} type="text" name="Article Image" accept="image/*" />
//
//         <img src="http://placehold.it/300x150" alt="Article" />
//         <span className="remove">Delete</span> <span>/</span> <span className="edit">Replace</span>
//       </div>
//
//       <div className="admin-article-content">
//         <label>Post Intro</label>
//         <textarea ref={(input) => this.articleIntro = input} type="text" name="Article Intro" />
//
//         <label>Match Intro</label>
//         <textarea ref={(input) => this.matchupIntro = input} type="text" name="Match Intro" />
//
//         <div className="admin-article-standings">
//           <div className="standings-data">
//             <h3>Current Standings:</h3>
//             <ul>
//             {
//               Object.keys(this.state.staged_standings).map((item, index)=> {
//                 return <li key={index}> {item}  <input type="number" name={item} onBlur={(e) => this.getTeamPoints(index, e)} /></li>
//               })
//             }
//             </ul>
//           </div>
//
//           <div className="standings-table">
//             <ol>
//               {
//                 Object.keys(this.state.subStaged_standings).map(this.renderStandings.bind(this))
//               }
//             </ol>
//           </div>
//         </div>
//       </div>
//     </div>
//     <button>click me</button>
//   </form>
//   <MatchupRecap handleStaged={this.handleStaged} stagedMatchups={this.state.staged_matchups} owners={this.state.owners} />
//
// </div>
