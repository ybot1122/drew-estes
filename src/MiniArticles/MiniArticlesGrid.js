import React, { Component } from 'react';
import ReactModal from 'react-modal';

class MiniArticlesGrid extends Component {
  render() {
    return (
        <div className="mini-articles-grid">
          <div className="row">
            <div className="col-xs-6 mini-article">
                <h3><a href="#">Duckling One</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">Today at 6:40pm</p>
                <ReactModal 
                  isOpen={false}
                  contentLabel="Minimal Modal Example"
                  bodyOpenClassName="ReactModal__Body--open"
                >
                  <p>Here is a quick intro the mini post</p>
                  <p className="date-published">Today at 6:40pm</p>
                </ReactModal>
            </div>
            <div className="col-xs-6 mini-article">
                <h3><a href="#">Here is a duckling post with a really long title, or tweet-like message</a></h3>
                <p className="date-published">Yesterday at 2:02pm</p>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 mini-article">
                <h3><a href="#">This mini post has an image</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">December 30, 2017</p>
            </div>
            <div className="col-xs-6 mini-article">
                <h3><a href="#">Duckling Four</a></h3>
                <p>Here is a quick intro the mini post</p>
                <p className="date-published">December 28, 2017</p>
            </div>
          </div>
        </div>
    );
  }
}

export default MiniArticlesGrid;
