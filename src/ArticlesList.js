import React, { Component } from 'react';
import Store from './utils/stores/Store';
import Dispatcher from './utils/dispatchers/Dispatcher';

import ArticleCard from './ArticleCard';

import ArticleMetadata from './articlemetadata.json';

import ACTIONTYPES from './utils/constants/ActionTypes';

class ArticlesList extends Component {

  constructor(props) {
    super(props);
    this._sortByChanged = this._sortByChanged.bind(this);
    this._searchForChanged = this._searchForChanged.bind(this);
    this._onStoreUpdate = this._onStoreUpdate.bind(this);
    this.state = Store.getArticleListState();
  }

  componentDidMount() {
    Store.addListener(this._onStoreUpdate);
  }

  componentWillUnmount() {
    Store.removeListener(this._onStoreUpdate);
  }

  _onStoreUpdate() {
    this.setState(Store.getArticleListState());
  }

  _sortByChanged(e) {
    Dispatcher.dispatch(ACTIONTYPES.UPDATE_ARTICLE_LIST_SEARCH, {
      sortBy: e.target.value
    });
  }

  _searchForChanged(e) {
    Dispatcher.dispatch(ACTIONTYPES.UPDATE_ARTICLE_LIST_SEARCH, {
      searchFor: e.target.value
    });
  }

  _returnSortedAndFilteredData() {
    const data = ArticleMetadata;
    const result = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (!this.state.searchFor || data[key].title.toLowerCase().includes(this.state.searchFor.toLowerCase())) {
          result.push(data[key]); 
        }
      }
    }

    if (result.length === 0) {
      return <h1>Sorry, can't find any articles containing: {this.state.searchFor}</h1>;
    }

    if (this.state.sortBy === 'alphabetically') {
      result.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else if (this.state.sortBy === 'newest') {
      result.sort((a, b) => {
        return b.published - a.published;
      });
    } else {
      result.sort((a, b) => {
        return a.published - b.published;
      });
    }

    const domResult = [];
    for (let i = 0; i < result.length; i++) {
      domResult.push(
        <div className="row" key={i}>
          <ArticleCard title={result[i].title} url={result[i].url} publishDate={result[i].published} isCompact>
            <img src={process.env.PUBLIC_URL + '../images/articles/' + result[i].imageDir + '/' + result[i].heroImg} alt="hero" />
          </ArticleCard>
        </div>
      );
    }

    return domResult;
  }

  render() {
    const result = this._returnSortedAndFilteredData();
    return (
      <div id="article-list" className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <table>
              <tbody>
                <tr>
                  <th>Sort By:</th>
                  <th>Search For:</th>
                </tr>
                <tr>
                  <td>
                    <select onChange={this._sortByChanged} value={this.state.sortBy}>
                      <option value="alphabetically">Alphabetically</option>
                      <option value="newest">Date (newest first)</option>
                      <option value="oldest">Date (oldest first)</option>
                    </select>
                  </td>
                  <td>
                    <input onChange={this._searchForChanged} type="text" value={this.state.searchFor} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {result}
      </div>
    );
  }
}

export default ArticlesList;
