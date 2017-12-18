import React from 'react';

class BlogPost extends React.Component {
  render() {
    return(
      <div className="article-wrapper">
        <div className="article-desc">
          <span className="article-category">Category</span>
          <h1 className="article-headline">Post Headline</h1>
          <h2 className="article-sub-headline">Sub Headline</h2>
          <p className="article-contributor">by Author</p>

          <div className="article-meta">
            <div className="article-date">Jan 1, 2017</div>
          </div>

          <div className="article-img">Image</div>

          <div className="article-post">
            <div className="article-body">
              <p>Post Body</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPost;
