import React, { Component } from 'react';
import { Link } from 'react-router'
import objectToArray from '../utils/objectToArray';

import ArticleMetadata from '../articlemetadata.json';
import MiniArticleMetadata from '../miniarticlemetadata.json';

import '../styles/ArticlePreviews/ArticlesLinkFeed.css';

class ArticlesLinkFeed extends Component {
  render() {
    const mergedMetaData = {};
    Object.assign(mergedMetaData, ArticleMetadata, MiniArticleMetadata);
    console.log(mergedMetaData);
    const articles = objectToArray(mergedMetaData);
    articles.sort((a, b) => a.published - b.published);

    const result = [];
    articles.forEach((a, ind) => {
      result.push(<li key={ind}>{a.title}</li>);
    });

    return (
      <div className="articleslinkfeed--outer">
        <div className="articleslinkfeed--inner">
          <ul>
            {result}
          </ul>
        </div>
      </div>
    );
  }
}

ArticlesLinkFeed.propTypes = {
};

export default ArticlesLinkFeed;
