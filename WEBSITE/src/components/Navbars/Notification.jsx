import React from 'react';
import { Alert   } from 'reactstrap';
// import './style.css'


class Notification extends React.Component {
    // constructor(props) {
    //     super(props);
    //   }
      
  render() {
    return (
      <div>
          <Alert color="success">
            This is a success alert — check it out!
          </Alert>
          <Alert color="danger">
            This is a danger alert — check it out!
          </Alert>
          <Alert color="warning">
            This is a warning alert — check it out!
          </Alert>
          <Alert color="info">
            This is a info alert — check it out!
          </Alert>
      </div>
      );
  }
}
export default Notification;