import React, { Component } from 'react';
import _getReadableDate from './utils/getReadableDate';

class ArticleHeader extends Component {
  render() {
    const subtitle = (this.props.metadata.subtitle) ? <h2 className="subtitle">{this.props.metadata.subtitle}</h2> : null;
    return (
      <div className="article-header">
        <h1>{this.props.metadata.title}</h1>
        {subtitle}
        <h3>{this.props.metadata.author}</h3>
        <h3>{_getReadableDate(this.props.metadata.published)}</h3>
      </div>
    );
  }
}

ArticleHeader.propTypes = {
  metadata: React.PropTypes.object.isRequired
}

export default ArticleHeader;
