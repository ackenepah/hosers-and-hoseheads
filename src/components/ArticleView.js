import React from 'react';

import '../css/articleview.css';

class ArticleView extends React.Component {
  render() {
    return(
      <div className="container">
        <div className="form-content">
          <div className="article-list">
            <ul>
              <h3>Jaunary 2018</h3>
              <li>Week 13 Recap - The Dylan Larkin Fiasco<span>X</span></li>
              <li>Week 12 Recap - The Biloxi Frogs Relocate<span>X</span></li>
            </ul>

            <ul>
              <h3>DECEMBER 2018</h3>
              <li>Week 11 Recap - Barzal for the Calder Cup<span>X</span></li>
              <li>Week 10 Recap - The Brock Boeser Special<span>X</span></li>
              <li>Week 9 Recap - Anton Forsberg Sucks<span>X</span></li>
              <li>Week 8 Recap - Worst GM Ever<span>X</span></li>
            </ul>

            <ul>
              <h3>NOVEMBER 2018</h3>
              <li>Week 7 Recap - Phil "The Thrill" Kessel<span>X</span></li>
              <li>Week 6 Recap - Batmans Sidekick<span>X</span></li>
              <li>Week 5 Recap - Dorsett Is a Beast<span>X</span></li>
            </ul>
          </div>
        </div>
      </div>

    )
  }
}

export default ArticleView;
