import React, { Component } from 'react';

class MailingListForm extends Component {
  render() {
    return (
      <div id="mailingform" className="article">
        <h3>Join Mailing List</h3>
        <table>
          <tbody>
            <tr>
              <td>Name:</td>
              <td><input type="text" name="mailingform-name" id="mailingform-name" /></td>
            </tr>
            <tr>
              <td>Email:</td>
              <td><input type="text" name="mailingform-email" id="mailingform-email" /></td>
            </tr>
            <tr>
              <td colSpan="2"><input type="submit" value="Subscribe!" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MailingListForm;