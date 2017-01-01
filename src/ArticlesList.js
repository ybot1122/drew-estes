import React, { Component } from 'react';

import ArticleCard from './ArticleCard';

import ArticleMetadata from './articlemetadata.json';
import _orderedArticles from './utils/orderedArticles';

class ArticlesList extends Component {
  render() {
    const data = _orderedArticles(ArticleMetadata);
    var result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(
        <div className="row">
          <ArticleCard title={data[i].title} url={data[i].url} publishDate={data[i].published} key={i} isCompact>
          </ArticleCard>
        </div>
      );
    }
    return (
      <div className="container-fluid">{result}</div>
    );
  }
}

export default ArticlesList;
