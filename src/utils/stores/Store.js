/**
  The most boring store;
**/

import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatchers/Dispatcher';

// Mailing list form states
import STATUSES from '../constants/Statuses';

class Store {
  constructor() {
    this._listeners = [];
    this._onDispatch = this._onDispatch.bind(this);
    Dispatcher.register(this._onDispatch);
    this.mailingListFormState = {
      formStatus: STATUSES.UNSUBMITTED,
      formData: {
        name: null,
        email: null
      },
      errMessage: null
    };

    this.articleListState = {
      sortBy: 'newest',
      searchFor: ''
    }
  }

  addListener(callback) {
    this._listeners.push(callback);
  }

  removeListener(callback) {
    for (let i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i] === callback) {
        this._listeners.splice(i);
        return;
      }
    }
  }

  _emitChange() {
    for (let callback of this._listeners) {
      callback();
    }
  }

  _onDispatch(actionType, payload) {
    switch(actionType) {
      case ActionTypes.UPDATE_MAILING_LIST_FORM:
        this.mailingListFormState = Object.assign(this.mailingListFormState, payload);
        this._emitChange();
        break;
      case ActionTypes.UPDATE_ARTICLE_LIST_SEARCH:
        this.articleListState = Object.assign(this.articleListState, payload);
        this._emitChange();
        break;
      default:
        break;
    }
  }

  // getters
  getMailingListFormState(isFresh) {
    if (isFresh) {
      if (this.mailingListFormState.formStatus !== STATUSES.SUCCESS) {
        this.mailingListFormState = {
          formStatus: STATUSES.UNSUBMITTED,
          formData: {
            name: null,
            email: null
          },
          errMessage: null
        }
        this._emitChange();
      }
    }
    return this.mailingListFormState;
  }

  getArticleListState() {
    return this.articleListState;
  }
}

const singleton = new Store();

export default singleton;