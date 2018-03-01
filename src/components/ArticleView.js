import React from 'react';
import moment from 'moment';

import '../css/articleview.css';

class ArticleView extends React.Component {

  post(monthName, monthObject){
    return monthObject[monthName].map((item, key)=>{
      return (
        <div key={key} onClick={() => {this.props.editArticle(`recap-${item.post_date}`); this.props.changeComponent()}}>
          <li>{item.title}</li>
        </div>
        )
    })
  }

  render() {
    const d = this.props.details;

    let months = {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: []
    }

    Object.keys(d).map((data, key) => {
      if(months.hasOwnProperty(moment(d[data].post_date).format('MMMM'))){
        const mName = moment(d[data].post_date).format('MMMM');
        return months[mName].push(d[data]);
      }
      return false;
    })

    return(
      <div className="container">
        <div className="form-content">
          <div className="article-list">
            <ul>
                {
                  Object.keys(months).map((monthName, key)=>{
                    return months[monthName].length > 0 ?
                     (
                      <div key={key}>
                        <h3>{monthName}</h3>
                        {this.post(monthName, months)}
                      </div>
                    )
                    :
                    ''
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


// {
//   Object.keys(d).map((data, key) => {
//     // console.log(data, 'DAT DATA');
//     return(
//       <li key={key} onClick={() => {this.props.editArticle(data); this.props.changeComponent()}}>{d[data].title}</li>
//     )
//   })
// }
