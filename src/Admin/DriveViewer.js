import React, { Component } from 'react';

import { postPublisher } from '../utils/api/postPublisher';
import { getDriveFiles } from '../utils/api/getDriveFiles';
import Loader from '../Loader';

/*
  1: get files, and make user pick it
  2: using that file's ID publish it to end point
  3: render preview
*/
class DriveView extends Component {
  constructor(props) {
    super(props);
    this.renderArticles = this.renderArticles.bind(this);
    this.publishSubmit = this.publishSubmit.bind(this);
    this.state = {
      selectedFile: null,
      getDriveFilesStatus: 0, // 0: not started, 1: loading, 2: successful, 3: failure
      articles: null,
    };
  }

  componentDidMount() {
    this.setState({ getDriveFilesStatus: 1 });
    getDriveFiles(this.props.accessToken).then(
      (response) => {
        this.setState({
          getDriveFilesStatus: 2,
          articles: response.files,
        });
      },
      (err) => {
        this.setState({ getDriveFilesStatus: 3 });
      },
    );
  }

  publishSubmit(fileId) {
    return () => {
      return postPublisher(this.props.accessToken, fileId).then(
        (response) => console.log(response),
        (err) => console.log(err)
      );
    };
  }

  renderArticles() {
    if (!this.state.articles) {
      return (<Loader width={25} height={25} />);
    }

    const list = []
    this.state.articles.forEach((file, ind) => list.push(
      <li key={ind} onClick={this.publishSubmit(file.id)}>
        {`${file.name}: ${file.mimeType}`}
      </li>
    ));

    return (
      <ul className="driveList">
        {list}
      </ul>
    );
  }

  render() {
    let content = null;
    if (this.state.getDriveFilesStatus === 3) {
      content = (<div>an error occurred. try refreshing the page</div>);
    } else if (this.state.getDriveFilesStatus === 2) {
      content = this.renderArticles();
    }

    return (
      <div>
        <h2>Hello. Access token: {this.props.accessToken}></h2>
        {content}
      </div>
    );
  }
}

DriveView.propTypes = {
  accessToken: React.PropTypes.string.isRequired,
};

export default DriveView;
