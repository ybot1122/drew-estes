import React, { Component } from 'react';

import BigQuote from './BigQuote';
import Loader from './Loader';

import ArticleMetadata from './articlemetadata.json';

import _getReadableDate from './utils/getReadableDate';

class ArticleContents extends Component {
  constructor(props) {
    super(props);
    this._loadArticleContent = this._loadArticleContent.bind(this);
    this._parseHtmlTree = this._parseHtmlTree.bind(this);
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
          this.setState({ content: JSON.parse(httpRequest.responseText) });
        } else {
          this.setState({ error: true });
        }
      }
    };
    httpRequest.open('GET', 'https://s3-us-west-2.amazonaws.com/quackrabbitarticles/' + this.props.params.articleTitle + '.json', true);
    httpRequest.send(null);
  }

  _parseHtmlTree(data) {
    if (!data) return null;
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].node === 'element') {
        if (data[i].attr) {
          // replace class attribute with className
          if (data[i].attr.class) {
            data[i].attr.className = data[i].attr.class;
            delete data[i].attr.class;
          }
          // prepend PUBLIC_URL to image sources
          if (data[i].tag === 'img' && data[i].attr.src) {
            data[i].attr.src = process.env.PUBLIC_URL + '../' + data[i].attr.src;
          }
        }
        const children = this._parseHtmlTree(data[i].child);
        const props = Object.assign({}, data[i].attr, { key: i });

        if (data[i].tag === 'blockquote') {
          result.push(React.createElement(BigQuote, props, children));
        } else {
          result.push(React.createElement(data[i].tag, props, children));
        }
      } else if (data[i].node === 'text') {
        result.push(data[i].text);
      }
    }
    if (result.length === 0) {
      return null;
    }
    if (result.length === 1) {
      return result[0];
    }
    return result;
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

    const inner = (this.state.content) ? this._parseHtmlTree(this.state.content) : <Loader width={25} height={25} />

    return (
      <div id="solo-article">
        <span id="comments-quicklink"><a href="#article-comments">(0) Comments</a></span>
        <h1>{this.state.metadata.title}</h1>
        <h3>{this.state.metadata.author}</h3>
        <h3>{_getReadableDate(this.state.metadata.published)}</h3>
        <div>
          {inner}
        </div>
      </div>
    );
  }
}

ArticleContents.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default ArticleContents;
