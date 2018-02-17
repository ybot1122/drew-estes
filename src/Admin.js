import React, { Component } from 'react';

const g_API_KEY = '*';
const g_CLIENT_ID = '*.apps.googleusercontent.com';
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
    this.state = {
      isGoogleApiInitialized: false,
      loginStatus: 0, // 0: never tried, 1: in progress, 2: success, 3: fail
      googleUserData: {},
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
    promiseChain.then(() => {
      const gapi = window.gapi;
      this.setState({ loginStatus: 1 });
      gapi.auth2.getAuthInstance().signIn().then(() => {
        const currGoogleUser = gapi.auth2.getAuthInstance().currentUser.get();
        this.setState({
          loginStatus: 2,
          googleUserData: {
            id: currGoogleUser.getId(),
            name: currGoogleUser.getBasicProfile().getName(),
            authResponse: currGoogleUser.getAuthResponse(true),
          },
        });
        gapi.auth2.getAuthInstance().currentUser.listen(this.updateSigninStatus);
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
          }).then(() => resolve(true));
        });
      } catch(e) {
        reject('google api never loaded successfully. kill this page. ' + e);
      }
    });
  }

  render() {

    let cta = (<a href="#" onClick={this.handleAuthClick}>Click here to log in to your Google Drive</a>);
    if (this.state.loginStatus === 1) {
      cta = (<span>LOADING</span>);
    } else if (this.state.loginStatus === 2) {
      cta = (<span>WELCOME {this.state.googleUserData.name}</span>);
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
