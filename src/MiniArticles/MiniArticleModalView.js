import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router';

import logo from'../images/logo_simple.jpg';

class MiniArticleModalView extends Component {
  render() {
    return (
      <ReactModal 
        isOpen={this.props.isOpen}
        contentLabel="Tradition"
        className="ReactModal__Body--miniarticles"
        bodyOpenClassName="ReactModal__Body--open"
        closeTimeoutMS={300}
      >
        <div id="close-button">
          <p>
            <img id="logo" src={logo} alt="logo" />
            <a href="http://quackrabbit.com">Read More by Drew on <span className="close-button--site">QuackRabbit.com</span></a>
          </p>
        </div>
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
  title: React.PropTypes.string.isRequired,
};

export default MiniArticleModalView;
