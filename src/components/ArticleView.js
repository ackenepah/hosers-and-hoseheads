import React from 'react';

import '../css/articleview.css';

class ArticleView extends React.Component {
  render() {
    const d = this.props.details
    console.log(d, 'DEM DOUBLE DS');

    return(
      <div className="container">
        <div className="form-content">
          <div className="article-list">
            <ul>
              <h3>Jaunary 2018</h3>
              {
                Object.keys(d).map((data, key) => {
                  console.log(data, 'DAT DATA');
                  return(
                    <li key={key} onClick={() => {this.props.editArticle(data); this.props.changeComponent()}}>{d[data].title}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

    )
  }
}

export default ArticleView;
