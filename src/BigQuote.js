import React, { Component } from 'react';

class BigQuote extends Component {
  render() {
    return (
      <div className="blockquote">
        <blockquote>
          <div>{this.props.children}</div>
          <div className="quote-author">&ndash; {this.props.author}</div>
        </blockquote>
      </div>
    );
  }
}

BigQuote.propTypes = {
  author: React.PropTypes.string.isRequired
}

export default BigQuote;
