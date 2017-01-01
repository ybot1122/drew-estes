import React, { Component } from 'react';

import _getReadableDate from './utils/getReadableDate';

class ArticleCard extends Component {

  render() {
    const url = '/articles/' + this.props.url;

    if (this.props.isCompact) {
      return (
        <div className="col-xs-12">
          <div className="article compact">
            <h1 className="title"><a href={url}>{this.props.title}</a></h1>
            <p className="date-published">{_getReadableDate(this.props.publishDate)}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="col-xs-12">
        <div className="article">
          <h1 className="title"><a href={url}>{this.props.title}</a></h1>
          {this.props.children}
          <p className="read-more"><a href={url}>Read more&hellip;</a></p>
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
