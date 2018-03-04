import React, { Component } from 'react';
import { Link } from 'react-router'
import objectToArray from '../utils/objectToArray';
import getReadableDate from '../utils/getReadableDate';

import ArticleMetadata from '../articlemetadata.json';

import '../styles/ArticlePreviews/ArticlesLinkFeed.css';

class ArticlesLinkFeed extends Component {
  render() {
    const articles = objectToArray(ArticleMetadata)
      .sort((a, b) => b.published - a.published)
      .slice(1, 6);

    const result = [];
    articles.forEach((a, ind) => {
      result.push(
        <li className="lineitem" key={ind}>
          <Link to={`/articles/${a.url}`}>{a.title}</Link> <span className="lineitem--date">{getReadableDate(a.published)}</span>
        </li>
      );
    });

    return (
      <div className="articleslinkfeed--outer">
        <ul className="articleslinkfeed--inner">
          {result}
        </ul>
      </div>
    );
  }
}

ArticlesLinkFeed.propTypes = {
};

export default ArticlesLinkFeed;
