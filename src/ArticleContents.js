import React, { Component } from 'react';

import Loader from './Loader';

import parseHtmlTree from './utils/parseHtmlTree';

class ArticleContents extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const inner = (this.props.content) ? parseHtmlTree(this.props.content) : <Loader width={25} height={25} />
    return (
      <div id="solo-article">
        <div>
          {inner}
        </div>
      </div>
    );
  }
}

ArticleContents.propTypes = {
  content: React.PropTypes.array
}

export default ArticleContents;
