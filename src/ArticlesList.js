import React, { Component } from 'react';

import ArticleCard from './ArticleCard';

import ArticleMetadata from './articlemetadata.json';
import _orderedArticles from './utils/orderedArticles';

class ArticlesList extends Component {

  _sortByChanged(e) {

  }

  _searchForChanged(e) {

  }

  render() {
    const data = _orderedArticles(ArticleMetadata);
    var result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(
        <div className="row" key={i}>
          <ArticleCard title={data[i].title} url={data[i].url} publishDate={data[i].published} isCompact>
            <img src={process.env.PUBLIC_URL + '../images/articles/' + data[i].imageDir + '/' + data[i].heroImg} alt="hero" />
          </ArticleCard>
        </div>
      );
    }
    return (
      <div id="article-list" className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <table>
              <tbody>
                <tr>
                  <th>Sort By:</th>
                  <th>Search For:</th>
                </tr>
                <tr>
                  <td>
                    <select onChange={this._sortByChanged}>
                      <option>Alphabetically</option>
                      <option>Date (newest first)</option>
                      <option>Date (oldest first)</option>
                    </select>
                  </td>
                  <td>
                    <input onChange={this._searchForChanged} type="text" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {result}
      </div>
    );
  }
}

export default ArticlesList;
