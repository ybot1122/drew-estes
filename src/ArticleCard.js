import React, { Component } from 'react';
import { Link } from 'react-router'

import _getReadableDate from './utils/getReadableDate';

class ArticleCard extends Component {

  render() {
    const url = '/articles/' + this.props.url;

    if (this.props.isCompact) {
      return (
        <div className="col-xs-12 no-gutter">
          <div className="article compact">
            <h1 className="title"><Link to={url}>{this.props.title}</Link></h1>
            <p className="date-published">{_getReadableDate(this.props.publishDate)}</p>
            {this.props.children}
          </div>
        </div>
      );
    }

    return (
      <div className="col-xs-12 no-gutter">
        <div className="article">
          <h1 className="title"><Link to={url}>{this.props.title}</Link></h1>
          {this.props.children}
          <p className="read-more"><Link to={url}>Read more&hellip;</Link></p>
          <p className="date-published">{_getReadableDate(this.props.publishDate)}</p>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  publishDate: React.PropTypes.number.isRequired,
  isCompact: React.PropTypes.bool
}

export default ArticleCard;
