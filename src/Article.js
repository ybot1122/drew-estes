import React, { Component } from 'react';

import ArticleContents from './ArticleContents';
import ArticleCommentList from './ArticleCommentList';

class Article extends Component {
  render() {
    return (
      <div>
        <ArticleContents params={this.props.params} />
        <ArticleCommentList />
      </div>
    );
  }
}

export default Article;
