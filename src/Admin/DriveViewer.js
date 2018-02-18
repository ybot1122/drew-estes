import React, { Component } from 'react';

import { postPublisher } from '../utils/api/postPublisher';
import { getDriveFiles } from '../utils/api/getDriveFiles';

/*
  1: get files, and make user pick it
  2: using that file's ID publish it to end point
  3: render preview
*/
class DriveView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      getDriveFilesStatus: 0, // 0: not started, 1: loading, 2: successful, 3: failure
    };
  }

  componentDidMount() {
    this.setState({ getDriveFilesStatus: 1 });
    getDriveFiles(this.props.accessToken).then(
      (response) => {
        this.setState({ getDriveFilesStatus: 2 });
      },
      (err) => {
        this.setState({ getDriveFilesStatus: 3 });
      },
    );
  }

  render() {
    return (
      <div>Hello. Access token: {this.props.accessToken}</div>
    );
  }
}

DriveView.propTypes = {
  accessToken: React.PropTypes.string.isRequired,
};

export default DriveView;
