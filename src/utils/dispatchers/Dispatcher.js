/**
  The most boring basic dispatcher;
  no waitFor functionality;
**/

class Dispatcher {
  constructor() {
    this._callbacks = [];
  }

  register(callback) {
    this._callbacks.push(callback);
  }

  dispatch(actionType, payload) {
    for (let callback of this._callbacks) {
      callback(actionType, payload);
    }
  }
}

const singleton = new Dispatcher();

export default singleton;