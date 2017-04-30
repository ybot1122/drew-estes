import React, { Component } from 'react';

import ArticleMetadata from './articlemetadata.json';
import ArticleContents from './ArticleContents';
import ArticleHeader from './ArticleHeader';
import ArticleCommentList from './ArticleCommentList';

class Article extends Component {
  constructor(props) {
    super(props);
    this._loadArticleContent = this._loadArticleContent.bind(this);
    this.state = {
      content: null,
      metadata: ArticleMetadata[this.props.params.articleTitle],
      error: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.state.metadata) {
      this._loadArticleContent();
    }
  }

  _loadArticleContent() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          this.setState({ content: JSON.parse(httpRequest.responseText) });
        } else {
          this.setState({ error: true });
        }
      }
    };
    httpRequest.open('GET', 'https://s3-us-west-2.amazonaws.com/quackrabbitarticles/' + this.props.params.articleTitle + '.json', true);
    httpRequest.send(null);
  }

  render() {
    // article metadata not found
    if (!this.state.metadata) {
      return (<div id="solo-article"><h1>Error, article not found.</h1></div>);
    }

    // network error loading the content
    if (this.props.error) {
      return (<div id="solo-article"><h1>Error loading content. Try refreshing.</h1></div>);
    }

    return (
      <div>
        <ArticleHeader metadata={this.state.metadata} />
        <ArticleContents content={this.state.content} />
        <ArticleCommentList />
      </div>
    );
  }
}

Article.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default Article;
