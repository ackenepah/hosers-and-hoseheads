import React from 'react';

import Article from './News/Article';

class Blog extends React.Component {
  render() {
    return(
      <div className="article-wrapper">
        <Article />
      </div>
    )
  }
}

export default Blog;
