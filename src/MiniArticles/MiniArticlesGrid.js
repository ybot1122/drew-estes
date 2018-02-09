import React, { Component } from 'react';

import MiniArticleModalView from './MiniArticleModalView';
import parseHtmlTree from '../utils/parseHtmlTree';
import _getReadableDate from '../utils/getReadableDate';
import MiniArticleMetadata from '../miniarticlemetadata.json';

class MiniArticlesGrid extends Component {
  constructor(props) {
    super(props);
    this.toggleMiniArticleView = this.toggleMiniArticleView.bind(this);
    this.renderMiniArticlesFromMetadata = this.renderMiniArticlesFromMetadata.bind(this);
    this.state = {
      activeMiniArticle: -1,
      miniArticles: this._getLatestFourMiniArticles(MiniArticleMetadata),
    };
  }

  _getLatestFourMiniArticles(metadata) {
    const result = [];
    for (const article in metadata) {
      result.push(article);
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
    const miniArticleData = MiniArticleMetadata[this.state.miniArticles[ind]];
    return (
      <div className="col-xs-6 mini-article">
        <h3><a href="#" onClick={this.toggleMiniArticleView(ind)}>{miniArticleData.title}</a></h3>
        <p className="date-published">{_getReadableDate(miniArticleData.published)}</p>
        <MiniArticleModalView isOpen={this.state.activeMiniArticle === ind} onClose={this.toggleMiniArticleView(ind)}>
          {parseHtmlTree(miniArticleData.data)}
        </MiniArticleModalView>
      </div>
    );
  }

  render() {
    return (
        <div className="mini-articles-grid">
          <div className="row">
            {this.renderMiniArticlesFromMetadata(0)}
            {this.renderMiniArticlesFromMetadata(1)}
          </div>
          <div className="row">
            {this.renderMiniArticlesFromMetadata(2)}
            {this.renderMiniArticlesFromMetadata(3)}
          </div>
        </div>
    );
  }
}

export default MiniArticlesGrid;
