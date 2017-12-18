import React from 'react';

import Article from './News/Article';

class Blog extends React.Component {
  render() {
    return(
      <div className="article-container">
        <Article />
      </div>
    )
  }
}

export default Blog;
