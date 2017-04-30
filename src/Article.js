import React, { Component } from 'react';

import ArticleMetadata from './articlemetadata.json';
import ArticleContents from './ArticleContents';
import ArticleCommentList from './ArticleCommentList';
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

    const subtitle = (this.state.metadata.subtitle) ? <h2 className="subtitle">{this.state.metadata.subtitle}</h2> : null;

    return (
      <div>
        <h1>{this.state.metadata.title}</h1>
        {subtitle}
        <h3>{this.state.metadata.author}</h3>
        <h3>{_getReadableDate(this.state.metadata.published)}</h3>
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
