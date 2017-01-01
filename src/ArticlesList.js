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
        <ArticleCard title={data[i].title} url={data[i].url} publishDate={data[i].published} key={i} isCompact>
        </ArticleCard>
      );
    }
    return (
      <div>{result}</div>
    );
  }
}

export default ArticlesList;
