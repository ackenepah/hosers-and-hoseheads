import React from 'react';
import Article from './News/Article';
import base from '../config';

class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recaps: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(`/posts`, {
      context: this,
      state: 'recaps'
    })
  }

  render() {
    return(
      <div className="article-container">

        {Object.keys(this.state.recaps).map(key => <Article key={key}  details={this.state.recaps[key]}/>).reverse()}
      </div>
    )
  }
}

export default News;
