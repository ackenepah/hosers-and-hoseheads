import React from 'react';
import { Link } from 'react-dom';
import base from '../firebase';

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teststate: {},
      user: {
        name: '',
        image: ''
      },
      recap: {
        title: '',
        summary: '',
        image: '',
        intro: '',
        match_intro: '',
        standings: {
          team: {
            name: ''
          },
          points: ''
        },
        matchup_recap: {
          title: '',
          score: '',
          body: '',
          team_mvplvp: {
            team: {
              name: ''
            },
            body: ''
          }
        }
      }
    }
  }
    componentWillMount() {
      this.ref = base.syncState(`/posts`, {
        context: this,
        state: 'recap'
      })
    }

      // heresabutton(e){
      //   e.preventDefault();
      //   console.log('clicked');
      //   this.setState({teststate: {
      //     fish1: {
      //       name: 'Pacific Halibut',
      //       image: 'https://i.istockimg.com/file_thumbview_approve/36248396/5/stock-photo-36248396-blackened-cajun-sea-bass.jpg',
      //       desc: 'Everyones favorite white fish. We will cut it to the size you need and ship it.',
      //       price: 1724,
      //       status: 'available'
      //     },
      //
      //     fish2: {
      //       name: 'Lobster',
      //       image: 'https://i.istockimg.com/file_thumbview_approve/32135274/5/stock-photo-32135274-cooked-lobster.jpg',
      //       desc: 'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
      //       price: 3200,
      //       status: 'available'
      //     }
      //   }
      // })
      // }

      submitRecap(e){
        e.preventDefault()
        console.log("clicked");
        const recap = {
          title: this.title.value,
        }

        const newRecap = {...this.state.recap};
        const timeStamp = Date.now();

        newRecap[`recap-${timeStamp}`] = recap;

        this.setState({recap: newRecap})
      }

      componentDidUpdate(){
        console.log(this.state.recap, "test state");
      }


      addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timeStamp = Date.now();
        fishes[`fish-${timeStamp}`] = fish;
        // set state
        this.setState({ fishes });
      }

  render() {
    return(
      <div>
        <div className="admin-dashboard">
          <div className="admin-settings">
            <img src="http://placehold.it/50x50" alt="User" />
            <span>Welcome, User</span>
          </div>
        </div>
        <div className="admin-post">
          <form onSubmit={this.submitRecap.bind(this)}>
            <div className="admin-article-dets">
              <div className="admin-article-desc">
                <label>Post Title</label>
                <input ref={(input) => this.title = input} type="text" placeholder="Post Title" placeholder="Week 1 Recap" />

                <label>Post Summary</label>
                <input type="text" name="Summary" placeholder="Brandon's team suddenly falls apart and becomes the laughing stock of the leage!" />
              </div>
              <div className="admin-article-image">
                <label>Post Image</label>
                <input type="file" name="Article Image" accept="image/*" />

                <img src="http://placehold.it/300x150" alt="Article Image" />
                <span className="remove">Delete</span> <span>/</span> <span className="edit">Replace</span>
              </div>

              <div className="admin-article-content">
                <label>Post Intro</label>
                <textarea type="text" name="Article Intro" />

                <label>Match Intro</label>
                <textarea type="text" name="Match Intro" />

                <div className="admin-article-standings">
                  <div className="standings-data">
                    <h3>Current Standings:</h3>
                    <label>Team:</label>
                    <select>
                      <option value="The Kessel Run">The Kessel Run</option>
                    </select>

                    <label>Points:</label>
                    <input type="text" name="Teams Points" />
                  </div>

                  <div className="standings-table">
                    <ol>
                      <li>
                        <div className="standings-table-team">The Kessel Run</div>
                        <div className="standings-table-edit">
                          <span className="edit">edit</span> <span>/</span> <span className="remove">X</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <button>click me</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Admin;
