import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import MiniArticleModalView from './MiniArticleModalView';
import parseHtmlTree from '../utils/parseHtmlTree';
import _getReadableDate from '../utils/getReadableDate';
import MiniArticleMetadata from '../miniarticlemetadata.json';
import ArticleMetadata from '../articlemetadata.json';

import '../styles/MiniArticles/miniArticlesGrid.css';

class MiniArticlesGrid extends Component {
  constructor(props) {
    super(props);
    this.toggleMiniArticleView = this.toggleMiniArticleView.bind(this);
    this.renderMiniArticlesFromMetadata = this.renderMiniArticlesFromMetadata.bind(this);
    this.renderFullArticlesFromMetadata = this.renderFullArticlesFromMetadata.bind(this);
    this.renderSoloArticle = this.renderSoloArticle.bind(this);
    this.state = {
      activeMiniArticle: -1,
      miniArticles: this._getLatestFourArticles(MiniArticleMetadata),
      fullArticles: this._getLatestFourArticles(ArticleMetadata),
      totalArticles: Object.keys(ArticleMetadata).length,
    };
  }

  _getLatestFourArticles(metadata) {
    const result = [];
    for (const article in metadata) {
      if (metadata[article] && metadata[article].published) {
        result.push(article);
      }
    }
    result.sort((a, b) => {
      return metadata[b].published - metadata[a].published;
    });
    return result.slice(0, 4);
  }

  toggleMiniArticleView(miniArticleNum) {
    return () => {
      if (this.state.activeMiniArticle === miniArticleNum) {
        this.setState({ activeMiniArticle: -1 });
      } else {
        this.setState({ activeMiniArticle: miniArticleNum });
      }
    };
  }

  renderMiniArticlesFromMetadata(ind) {
    let newBanner = null;
    const miniArticleData = MiniArticleMetadata[this.state.miniArticles[ind]];
    if (!miniArticleData) return null;
    return (
      <div className="col-xs-6 mini-article">
        {newBanner}
        <h3><Link to={`${miniArticleData.url}`}>{miniArticleData.title}</Link></h3>
        <p className="date-published">{_getReadableDate(miniArticleData.published)}</p>
        <MiniArticleModalView title={miniArticleData.title} isOpen={this.state.activeMiniArticle === ind} onClose={this.toggleMiniArticleView(ind)}>
          {parseHtmlTree(miniArticleData.data)}
        </MiniArticleModalView>
      </div>
    );
  }

  renderFullArticlesFromMetadata(ind) {
    const fullArticleData = ArticleMetadata[this.state.fullArticles[ind]];
    if (!fullArticleData) return null;
    return (
      <div className="col-xs-6 mini-article">
        <h3><Link to={`articles/${fullArticleData.url}`}>{fullArticleData.title}</Link></h3>
        <p className="date-published">{_getReadableDate(fullArticleData.published)}</p>
        <MiniArticleModalView title={fullArticleData.title} isOpen={this.state.activeMiniArticle === ind} onClose={this.toggleMiniArticleView(ind)}>
          {parseHtmlTree(fullArticleData.data)}
        </MiniArticleModalView>
      </div>
    );
  }

  // TODO: kind of a weird escape hatch here to support deep-linking mini articles
  renderSoloArticle() {
    if (this.props.initArticle) {
      const miniArticleData = MiniArticleMetadata[this.props.initArticle];
      if (miniArticleData && miniArticleData.data && miniArticleData.title) {
        return (
          <MiniArticleModalView title={miniArticleData.title} isOpen={true} onClose={() => browserHistory.push('/')}>
            <div className="mini-article-container">
              {parseHtmlTree(miniArticleData.data)}
            </div>
          </MiniArticleModalView>
        );
      } else {
        return (
          <MiniArticleModalView title="Sorry, article not found." isOpen={true} onClose={() => browserHistory.push('/')}>
            <p>Sorry about the bad link!</p>
            <Link to="/" className="nav-button">Go back to homepage</Link>
          </MiniArticleModalView>
        );
      }
    }
  }

  render() {
    return (
        <div className="mini-articles-grid">
          {this.renderSoloArticle()}
          <h4>Mini-Reads</h4>
          <div className="row">
            {this.renderMiniArticlesFromMetadata(0)}
            {this.renderMiniArticlesFromMetadata(1)}
          </div>
        </div>
    );
  }
}

MiniArticlesGrid.propTypes = {
  initArticle: React.PropTypes.string,
};

export default MiniArticlesGrid;
