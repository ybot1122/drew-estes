import React, { Component } from 'react';

class BigQuote extends Component {
  render() {
    const author = (this.props.author) ? <div className="quote-author">&ndash; {this.props.author}</div> : null;
    return (
      <div className="blockquote">
        <blockquote>
          <div>{this.props.children}</div>
          {author}
        </blockquote>
      </div>
    );
  }
}

BigQuote.propTypes = {
  author: React.PropTypes.string
}

export default BigQuote;
