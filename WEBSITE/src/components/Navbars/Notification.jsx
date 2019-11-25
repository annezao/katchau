import React from 'react';
import { Alert   } from 'reactstrap';
// import './style.css'
import servicesNotifications from '../../services/notification'

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          notifications: [],
          loadingMsg: "Carregando..."
        }
      }

  componentDidMount() {
      this.loadNotifications();
  }

  loadNotifications(){

    let component = this;

    servicesNotifications.readNotifications()
    .then(function (notifications) {

        console.log(notifications);

        component.setState({
            loading: false,
            notifications: notifications
        });

    }).catch(function (error) {
        console.log("Error: " + error.code);

        if(error.code === 209){
            component.props.history.push('/login');
        }
        else {
            component.setState({
                loading: false
            });
        }
    });
  }
      
  render() {
    return (
      this.state.loading ?
        <p>{this.state.loadingMsg}</p> :
        <div>
          {
            this.state.notifications.length > 0 ? (
                this.state.notifications.map((notification, index) => (
                  <Alert color="danger" key={index}>
                    <p><strong>{notification.title}</strong></p>
                    <p>{notification.description}</p>
                  </Alert>
                )
              )

            ) : <></>
          }
        </div>
      );
  }
}
export default Notification;