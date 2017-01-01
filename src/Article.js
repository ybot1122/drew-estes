import React, { Component } from 'react';

import ArticleMetadata from './articlemetadata.json';

import _getReadableDate from './utils/getReadableDate';

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
    if (this.state.metadata) {
      this._loadArticleContent();
    }
  }

  _loadArticleContent() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          this.setState({ content: httpRequest.responseText });
        } else {
          this.setState({ error: true });
        }
      }
    };
    httpRequest.open('GET', 'https://s3-us-west-2.amazonaws.com/quackrabbitarticles/' + this.props.params.articleTitle + '.html', true);
    httpRequest.send(null);
  }

  render() {
    // article metadata not found
    if (!this.state.metadata) {
      return (<div id="solo-article"><h1>Error, article not found.</h1></div>);
    }

    // network error loading the content
    if (this.state.error) {
      return (<div id="solo-article"><h1>Error loading content. Try refreshing.</h1></div>);
    }

    return (
      <div id="solo-article">
        <h1>{this.state.metadata.title}</h1>
        <h2>{this.state.metadata.author}</h2>
        <h2>{_getReadableDate(this.state.metadata.published)}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
      </div>
    );
  }
}

export default Article;
