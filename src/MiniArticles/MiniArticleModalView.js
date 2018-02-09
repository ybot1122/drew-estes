import React, { Component } from 'react';
import ReactModal from 'react-modal';

class MiniArticleModalView extends Component {
  render() {
    return (
      <ReactModal 
        isOpen={this.props.isOpen}
        contentLabel="Tradition"
        bodyOpenClassName="ReactModal__Body--open"
      >
        <a href="#" id="close-button" onClick={this.props.onClose}>X</a>
        <div className="mini-article-modal-header">
          <h1>{this.props.title}</h1>
        </div>
        <div className="mini-article-modal-content">
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
};

MiniArticleModalView.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  children: React.PropTypes.array.isRequired,
  onClose: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default MiniArticleModalView;
