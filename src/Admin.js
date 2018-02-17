import React, { Component } from 'react';
import { g_API_KEY, g_CLIENT_ID } from './utils/constants/CREDENTIALS';

const g_SCOPES = 'profile https://www.googleapis.com/auth/drive';
const g_DISCOVER_DOCS = ['https://developers.google.com/drive/v3/reference/'];

const g_LOAD_SDK = () => {
  if (!document.getElementById('googleapi')) {
    ((d, s, id) => {
      const sdk = d.createElement(s);
      sdk.id = id;
      sdk.src = 'https://apis.google.com/js/api.js';
      sdk.async = true;
      d.body.insertBefore(sdk, null);
    })(document, 'script', 'googleapi');
  }  
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.initializeGoogleApi = this.initializeGoogleApi.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handlePublishSubmit = this.handlePublishSubmit.bind(this);
    this.state = {
      loginStatus: 0, // 0: never tried, 1: in progress, 2: success, 3: fail
      publishRequestStatus: 0, // 0: never tried, 1: in progress, 2: success, 3: fail
      isGoogleApiInitialized: false,
      googleUserData: {},
      googleDocId: '',
    };
  }

  componentDidMount() {
    g_LOAD_SDK();
  }

  updateSigninStatus(googleUser) {
    console.log(googleUser.isSignedIn());
    if (!googleUser.isSignedIn()) {
      this.setState({
        loginStatus: 0,
        googleUserData: {},
      });
    }
  }

  handleAuthClick() {
    let promiseChain = Promise.resolve(true);
    if (!this.state.isGoogleApiInitialized) {
      promiseChain = this.initializeGoogleApi();
    }
    console.log(promiseChain);
    promiseChain.then(() => {
      const gapi = window.gapi;
      this.setState({ loginStatus: 1 });
      gapi.auth2.getAuthInstance().signIn().then(() => {
        const currGoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
        gapi.auth2.getAuthInstance().currentUser.listen(this.updateSigninStatus);
        this.setState({
          loginStatus: 2,
          googleUserData: {
            id: currGoogleUser.getId(),
            name: currGoogleUser.getBasicProfile().getName(),
            authResponse: currGoogleUser.getAuthResponse(true),
          },
        });
      }).catch((e) => {
        console.error(e);
        this.setState({ loginStatus: 3 });
      });
    });
  }

  initializeGoogleApi() {
    return new Promise((resolve, reject) => {
      try {
        const gapi = window.gapi;
        gapi.load('auth2', () => {
          gapi.auth2.init({
              apiKey: g_API_KEY,
              discoveryDocs: g_DISCOVER_DOCS,
              clientId: g_CLIENT_ID,
              scope: g_SCOPES
          }).then(() => resolve(true), (e) => reject(e));
        });
      } catch(e) {
        reject('google api never loaded successfully. kill this page. ' + e);
      }
    });
  }

  handlePublishSubmit() {
    this.setState({ publishRequestStatus: 1 });
    setTimeout(() => {
      const reqBody = {
        token: this.state.googleUserData.authResponse,
        docId: this.state.googleDocId,
      };
      this.setState({ publishRequestStatus: 2 });
      console.log(reqBody);
    }, 1000);
  }

  render() {
    let cta = (<a href="#" onClick={this.handleAuthClick}>Click here to log in to your Google Drive</a>);
    if (this.state.loginStatus === 1) {
      cta = (<span>LOADING</span>);
    } else if (this.state.loginStatus === 2) {
      return (
        <div className="container-fluid">
          <h1>WELCOME {this.state.googleUserData.name}</h1>
          <p>
            Enter the ID of the Google Doc you want to publish:
            <input type="text" value={this.state.googleDocId} onChange={(event) => this.setState({ googleDocId: event.value })} />
            <input type="submit" value="Submit" onClick={this.handlePublishSubmit} />
          </p>
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      cta = (<a href="#" onClick={this.handleAuthClick}>Something went wrong, try again.</a>);
    }
    console.log(this.state);

    return (
      <div className="container-fluid">
        <h1>Hello</h1>
        {cta}
      </div>
    );
  }
}

Admin.propTypes = {

};

export default Admin;
