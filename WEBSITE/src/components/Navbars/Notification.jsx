import React from 'react';
import { Alert   } from 'reactstrap';
// import './style.css'
import {readNotifications, notifications} from '../../variables/notification'

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          notifications: [],
          loadingMsg: "loading..."
        }
      }

  componentDidMount(){
      this.loadNotifications();
  }

  loadNotifications(){
    this.setState({
      notifications: notifications
    })
    // let component = this;
    // console.log("notifications");
    // readNotifications()
    // .then(function (notifications) {

    //     console.log(notifications);

    //     component.setState({
    //         loading: false,
    //         notifications: notifications
    //     });

    //     // component.props.handleLoadingStatus(false);

    // }).catch(function (error) {
    //     console.log("Error: " + error.code);

    //     if(error.code === 209){
    //         component.props.history.push('/login');
    //     }
    //     else {
    //         component.setState({
    //             loading: false
    //         });
    //     }
    //     // component.props.handleLoadingStatus(false);
    // });
  }
      
  render() {
    return (
      this.state.loading ? 
      <div>
            {
              this.state.notifications.length > 0 ? (
                this.state.notifications.map((notification, index) =>(
                  <Alert color="danger">
                    <p>{notification.title}:</p>
                    <p>{notification.description}</p>
                    </Alert>
                  )
                )
               
              ): <></>
            }
      </div>:
      <p>{this.state.loadingMsg}</p>
      );
  }
}
export default Notification;