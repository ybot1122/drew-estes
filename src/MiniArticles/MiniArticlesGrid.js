import React, { Component } from 'react';

import MiniArticleModalView from './MiniArticleModalView';

import ArticleMetadata from '../miniarticlemetadata.json';

class MiniArticlesGrid extends Component {
  constructor(props) {
    super(props);
    this.toggleMiniArticleView = this.toggleMiniArticleView.bind(this);
    this.state = {
      activeMiniArticle: -1,
    };
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

  render() {
    return (
        <div className="mini-articles-grid">
          <div className="row">
            <div className="col-xs-6 mini-article">
                <h3><a href="#" onClick={this.toggleMiniArticleView(1)}>Duckling One</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">Today at 6:40pm</p>
                <MiniArticleModalView isOpen={this.state.activeMiniArticle === 1} onClose={this.toggleMiniArticleView(1)}>
                  <p>Here is a quick intro the mini post</p>
                  <p className="date-published">Today at 6:40pm</p>
                </MiniArticleModalView>
            </div>
            <div className="col-xs-6 mini-article">
                <h3><a href="#" onClick={this.toggleMiniArticleView(2)}>Here is a duckling post with a really long title, or tweet-like message</a></h3>
                <p className="date-published">Yesterday at 2:02pm</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 mini-article">
                <h3><a href="#" onClick={this.toggleMiniArticleView(3)}>This mini post has an image</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">December 30, 2017</p>
            </div>
            <div className="col-xs-6 mini-article">
                <h3><a href="#" onClick={this.toggleMiniArticleView(4)}>Duckling Four</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">December 28, 2017</p>
            </div>
          </div>
        </div>
    );
  }
}

export default MiniArticlesGrid;
