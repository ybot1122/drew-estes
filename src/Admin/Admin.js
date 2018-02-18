import React, { Component } from 'react';
import { g_API_KEY, g_CLIENT_ID } from '../utils/constants/CREDENTIALS';
import Loader from '../Loader';
import DriveViewer from './DriveViewer';

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
      loginStatus: 0, // 0: never tried, 1: in progress, 2: success, 3: fail
      publishRequestStatus: 0, // 0: never tried, 1: in progress, 2: success, 3: fail
      isGoogleApiInitialized: false,
      googleUserData: {},
    };
  }

  componentDidMount() {
    g_LOAD_SDK();
  }

  updateSigninStatus(googleUser) {
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
        console.log(currGoogleUser.getAuthResponse(true));
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

  render() {
    let content = null;

    if (this.state.loginStatus === 2) {
      content = (<DriveViewer accessToken={this.state.googleUserData.authResponse.access_token} />);
    } else if (this.state.loginStatus === 0) {
      content = (<a href="#" onClick={this.handleAuthClick}>Authorize Google Drive</a>);
    } else if (this.state.loginStatus === 1) {
      content = (<Loader width={25} height={25} />);
    } else if (this.state.loginStatus === 3) {
      content = (<div>login error. reload page and try again.</div>);
    }

    return (
      <div className="container-fluid">
        <h1>Publisher Center</h1>
        {content}
      </div>
    );
  }
}

Admin.propTypes = {

};

export default Admin;
