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
        <a href="#" onClick={this.props.onClose}>Click here to exit</a>
        {this.props.children}
      </ReactModal>
    );
  }
};

MiniArticleModalView.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
  onClose: React.PropTypes.func.isRequired,
};

export default MiniArticleModalView;
