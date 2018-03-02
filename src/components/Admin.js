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
    this.editArticle = this.editArticle.bind(this);
    this.togglePostView = this.togglePostView.bind(this);
    this.resetForm = this.resetForm.bind(this);
    // this.handleAuth = this.handleAuth.bind(this);

    this.state = {
      user: {
        name: '',
        image: ''
      },
      recaps: {},
      recap: {
        title: null,
        summary: null,
        image: null,
        article_intro: null,
        match_intro: null,
        standings: null,
        matchup_recaps: null,
        post_date: null
      },
      staged_standings: {},
      subStaged_standings: {},
      staged_matchups: [],
      owners: {},
      modalNoMatchups: false,
      modalSubmitSuccess: false,
      component: true,
      editing: false,
      editingId: null,
      newPostView: false,
      baseStaged_standings: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/posts`, {
      context: this,
      state: 'recaps'
    })

    base.fetch('/owners', {
      context: this,
      then(data){
        this.setState({staged_standings: data, baseStaged_standings: data, owners: data})
      }
    });
  }

  submitRecap(e, staged){
    console.log(this.state.editingId, "submitting recap");
    e.preventDefault()
    if(this.state.staged_matchups && this.state.staged_matchups.length <= 0){
      this.setState({modalNoMatchups: !this.state.modalNoMatchups})
      return;
    } else if (this.state.editing){
      const editTimeStamp = Date.now();
      let recaps = {...this.state.recaps}
      const recap = {
        title: this.title.value,
        summary: this.summary.value,
        image: this.image.value,
        article_intro: this.articleIntro.value,
        matchup_intro: this.matchupIntro.value,
        standings: this.state.subStaged_standings,
        matchup_recaps: this.state.staged_matchups,
        edit_date: editTimeStamp
      }
      recaps[this.state.editingId] = recap;
      this.setState({recaps})
    } else {
      const timeStamp = Date.now();
      const newRecap = {...this.state.new_recap};
      const recap = {
        title: this.title.value,
        summary: this.summary.value,
        image: this.image.value,
        article_intro: this.articleIntro.value,
        matchup_intro: this.matchupIntro.value,
        standings: this.state.subStaged_standings,
        matchup_recaps: this.state.staged_matchups,
        post_date: timeStamp,
        author: {
          name: rebaseAuth.currentUser.displayName,
          id: rebaseAuth.currentUser.uid,
          photo: rebaseAuth.currentUser.photoURL
        }
      }
      newRecap[`recap-${timeStamp}`] = recap;
      this.setState({recaps: newRecap})
    }
    this.setState({modalSubmitSuccess: !this.state.modalSubmitSuccess, editing: false})
    this.resetForm();
  }

  handleStaged(matchup_recaps, type){
    //this function is not needed - data is being manipulated directly in MatchupRecap component

    //////////// THIS IS BAD PRACTICE - NEED TO FIX ///////////

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

  editArticle(id) {
    const article = this.state.recaps[id]
    const editRecap = {
      title: article.title,
      summary: article.summary,
      image: article.image,
      article_intro: article.article_intro,
      matchup_intro: article.matchup_intro,
    }
    this.setState({recap: editRecap, editing: true, editingId: id, subStaged_standings: article.standings, staged_matchups: article.matchup_recaps})
  }

  getTeamPoints(index, e) {
    const subStandingsCopy = [...this.state.subStaged_standings]
    let teamFound = false;
    let teamFoundIndex = "";

    for(var i = 0; i < subStandingsCopy.length; i++){
      if (e.target.name === subStandingsCopy[i].team || e.target.name === Number(i)){
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

  renderRecapImage(imgurl){
    let recap = {...this.state.recap};
    recap.image = imgurl.value;
    this.setState({recap})
  }

  resetForm(){
    console.log('resetting');
    this.setState({
      recap: {},
      staged_matchups: [],
      staged_standings: this.state.baseStaged_standings,
      subStaged_standings: {}
    })
    this.title.value = ""
    this.summary.value = ""
    this.image.value = ""
    this.articleIntro.value = ""
    this.matchupIntro.value = ""
  }

  componentDidUpdate(){
    // console.log(this.state.staged_matchups, "this.matchups");
  }

  togglePostView(bool){
    this.setState({newPostView: bool})
    if(this.state.newPostView){
      this.resetForm();
      this.setState({editing: false})
    }
  }

  render() {
    const bgImg = this.state.recap.image ? this.state.recap.image : "http://via.placeholder.com/460x200";
    const buttonText = this.state.editing ? 'Clear Form' : 'New Post';

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

            <div className=" admin-button-group">
              <button onClick={()=>{this.togglePostView(false)}}>Articles </button>
              <button onClick={()=>{this.togglePostView(true)}}>{buttonText}</button>
            </div>

            { this.state.newPostView ?

            <div>
              <form id="main-form" onSubmit={(e) => this.submitRecap(e)} ref={(input) => {this.mainForm = input}}>
                <div className="container light">
                  <div className="form-content flex-column">
                    <div className="flex-row">
                      <div className="col">
                        <h3>Post Title</h3>
                        <p>(i.e. Week 1 Recap)</p>
                        <input ref={(input) => this.title = input} type="text" defaultValue={this.state.recap.title} placeholder="Week 1 Recap" />
                      </div>

                      <div className="gutter"></div>

                      <div className="col">
                        <h3>Post Summary</h3>
                        <p>(i.e Brandon will always be the league’s Sacko)</p>
                        <input ref={(input) => this.summary = input} type="text" defaultValue={this.state.recap.summary} placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
                      </div>
                    </div>

                    <div className="flex-row">
                      <div className="col img-post">
                        <h3>Image URL</h3>
                        <p>Copy and paste the image URL from imgur.com.</p>
                        <input ref={(input) => this.image = input} type="text" defaultValue={this.state.recap.image}  onBlur={()=>this.renderRecapImage(this.image)}name="Article Image" accept="image/*" />
                      </div>

                      <div className="gutter"></div>

                      <div className="col">

                        <div style={{width:"460px", height: "200px", backgroundSize: "cover", backgroundImage: `url(${bgImg})`}} alt="Article" ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container dark">
                   <div className="form-content flex-row">
                     <div className="col">
                      <h3>Post Intro</h3>
                      <p>Write an overall summary of the week.</p>
                      <textarea ref={(input) => this.articleIntro = input} type="text" defaultValue={this.state.recap.article_intro} name="Article Intro" />
                     </div>

                     <div className="gutter"></div>

                     <div className="col">
                      <h3>Matchups Intro</h3>
                      <p>Highlight some big moments in the matchups.</p>
                      <textarea ref={(input) => this.matchupIntro = input} type="text" defaultValue={this.state.recap.matchup_intro} name="Match Intro" />
                     </div>
                   </div>
                </div>

                <div className="container light">
                  <div className="form-content flex-row standings">
                    <div className="col">
                      <h3>Update Standings</h3>
                      <p>Add the points each team has and the staged standings will update automatically.</p>


                      <ul>
                        { this.state.editing ?
                          Object.keys(this.state.subStaged_standings)
                                .map((item, index) => { return <li key={index} className="flex-row"> {this.state.subStaged_standings[index].team}<input type="number" name={item} onBlur={(e) => this.getTeamPoints(index, e)} defaultValue={this.state.subStaged_standings[index].points}  /></li> })
                          :

                            Object.keys(this.state.staged_standings)
                                  .map((item, index) => { return <li key={index} className="flex-row"> { item } <input type="number" name={item} onBlur={(e) => this.getTeamPoints(index, e)}  /></li> })

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
                  { this.state.editing ?
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <button form="main-form" style={{width: "80%"}}>Edit Post</button>
                      <button style={{background: "#C40C0C", width: "18%", color: "#f1f1f1"}}>DELETE</button>
                    </div>

                    :
                    <button form="main-form">Publish Post</button>

                  }
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
            <ArticleView mainForm={this.mainForm} details={this.state.recaps} editArticle={this.editArticle} changeComponent={() => { this.setState({ newPostView: !this.state.newPostView }) }} />
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
