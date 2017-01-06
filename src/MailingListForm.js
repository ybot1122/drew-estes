import React, { Component } from 'react';
import Store from './utils/stores/Store';
import Dispatcher from './utils/dispatchers/Dispatcher';

import Loader from './Loader';

import ACTIONTYPES from './utils/constants/ActionTypes';
import STATUSES from './utils/constants/Statuses';
const ENDPOINT = 'https://cbok150lka.execute-api.us-west-2.amazonaws.com/QuackRabbitStage/mailinglist';
const validateEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

class MailingListForm extends Component {
  constructor(props) {
    super(props);
    this._onComplete = this._onComplete.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onStoreUpdate = this._onStoreUpdate.bind(this);
    this.state = Store.getMailingListFormState();
    console.log(this.state);
  }

  componentDidMount() {
    Store.addListener(this._onStoreUpdate);
  }

  componentWillUnmount() {
    Store.removeListener(this._onStoreUpdate);
  }

  _onStoreUpdate() {
    this.setState(Store.getMailingListFormState());
  }

  _onComplete(response, isError = false) {
    if (!isError) {
      Dispatcher.dispatch(ACTIONTYPES.UPDATE_MAILING_LIST_FORM, {
        formStatus: STATUSES.SUCCESS
      });
    } else {
      let errMessage;
      if (response.title === 'Invalid params') {
        errMessage = 'Name and email address are required.';
      } else if (response.title === 'Member Exists') {
        errMessage = 'This email is already subscribed.';
      } else if (response.title === 'Invalid Resource') {
        errMessage = 'Invalid email address.';
      } else {
        errMessage = 'Unknown error occurred.';
      }
      Dispatcher.dispatch(ACTIONTYPES.UPDATE_MAILING_LIST_FORM, {
        formStatus: STATUSES.ERROR,
        errorMessage: errMessage
      });
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    // if loading or already successful, do nothing
    if (this.state.formStatus === STATUSES.LOADING || this.state.formStatus === STATUSES.SUCCESS) {
      return false;
    }

    // if form data exists and did not change, do nothing
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    if (this.state.formData && this.state.formData.name === name && this.state.formData.email === email) {
      return false;
    }

    const httpRequest = new XMLHttpRequest();

    if (!name) {
      this._onComplete({ title: 'Invalid params' }, true);
      return;
    }

    if (!email || !validateEmail(email)) {
      this._onComplete({ title: 'Invalid Resource' }, true);
      return;
    }

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          this._onComplete(JSON.parse(httpRequest.responseText));
        } else {
          let data;
          try {
            data = JSON.parse(httpRequest.responseText);
          } catch(e) {
            data = { title: 'Unknown' };
          }
          this._onComplete(data, true);
        }
      }
    };
    httpRequest.open('POST', ENDPOINT, true);
    //httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify({
      name: name,
      email_address: email
    }));

    Dispatcher.dispatch(ACTIONTYPES.UPDATE_MAILING_LIST_FORM, {
      formStatus: STATUSES.LOADING,
      formData: {
        name: name,
        email: email
      }
    });
  }

  render() {
    if (this.state.formStatus === STATUSES.SUCCESS) {
      return (<div id="mailingform" className="article"><h3>Thanks for subscribing, {this.state.formData.name}!</h3></div>);
    }

    const isDisabled = (this.state.formStatus === STATUSES.LOADING) ? true : false;
    const submitButton = (this.state.formStatus === STATUSES.LOADING)
      ? <Loader height={25} width={25} />
      : <input type="submit" value="Subscribe!" />
    const errorRow = (this.state.formStatus === STATUSES.ERROR)
      ? <tr className="err"><td colSpan="2">{this.state.errorMessage}</td></tr>
      : null;

    return (
      <div id="mailingform" className="article">
        <h3>Join Mailing List</h3>
        <form onSubmit={this._onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  <input
                    type="text"
                    name="mailingform-name"
                    id="mailingform-name"
                    disabled={isDisabled}
                    ref={(input) => { this.nameInput = input; }} />
                  </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="text"
                    name="mailingform-email"
                    id="mailingform-email"
                    disabled={isDisabled}
                    ref={(input) => { this.emailInput = input; }} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">{submitButton}</td>
              </tr>
              {errorRow}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default MailingListForm;