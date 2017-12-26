import React from 'react';

import Article from './News/Article';

class News extends React.Component {
  render() {
    return(
      <div className="article-container">
        <Article />
      </div>
    )
  }
}

export default News;
