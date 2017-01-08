import React, { Component } from 'react';

import MailingListForm from './MailingListForm';
import SupportPatreon from './SupportPatreon';

import facebookLogo from './images/facebook_logo.png';
import instagramLogo from './images/instagram_logo.png';
import linkedinLogo from './images/linkedin_logo.png';
import mediumLogo from './images/medium_logo.png';

class Support extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 no-gutter">
            <div className="article">
              <h3>Connect With Us</h3>
              <table className="support-connect">
                <tbody>
                  <tr>
                    <td><a href="https://www.facebook.com/drew.estes"><img src={facebookLogo} alt="facebook logo" /></a></td>
                    <td><a href="https://www.instagram.com/drew_estes/"><img src={instagramLogo} alt="instagram logo" /></a></td>
                    <td><a href="https://www.linkedin.com/in/drew-estes-a240aa65"><img src={linkedinLogo} alt="linkedin logo" /></a></td>
                    <td><a href="https://medium.com/@drew_estes"><img src={mediumLogo} alt="medium logo" /></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 no-gutter">
            <MailingListForm />
          </div>
          <div className="col-xs-12 col-sm-6 no-gutter">
            <SupportPatreon />
          </div>
        </div>
      </div>
    );
  }
}

export default Support;
