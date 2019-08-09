import React from "react";
import Switch from "react-switch";
import './style.css'

/*Icones*/
import { FiMail, FiBell, FiVolume2 } from 'react-icons/fi';
import { MdVibration } from 'react-icons/md';

// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

class Settings extends React.Component {
	
    constructor() {
        super();
        this.state = {
             checkedEmail: false,
             checkedPush: false,
             checkedVibrate: false,
             checkedSound: false,
             checkedInterval: false,
            };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePush = this.handleChangePush.bind(this);
        this.handleChangeVibrate = this.handleChangeVibrate.bind(this);
        this.handleChangeSound = this.handleChangeSound.bind(this);
        this.handleChangeInterval = this.handleChangeInterval.bind(this);

      }
     
      handleChangeEmail(checked) {
        this.setState({ checkedEmail: checked });
      }
      handleChangePush(checked) {
        this.setState({ checkedPush: checked });
      }
      handleChangeVibrate(checked) {
        this.setState({ checkedVibrate: checked });
      }
      handleChangeSound(checked) {
        this.setState({ checkedSound: checked });
      }
      handleChangeInterval(checked) {
        this.setState({ checkedInterval: checked });
      }
    
    render() {
        return (
            <>
            <div className="content">
                <Row>
                    <Card className="card">
                        <CardHeader>
                        <CardTitle tag="h2">Configurações</CardTitle>
                        </CardHeader>
                        <CardBody className="body-style">
                            <Row>
                                <Col sm="6" xs="8" >
                                    <CardText><FiMail/> Notificar via e-maill</CardText>
                                </Col> 
                                <Col>
                                    <label>
                                        <Switch
                                            checked={this.state.checkedEmail}
                                            onChange={this.handleChangeEmail}
                                            onColor="#a85bd5"
                                            onHandleColor="#8b1acc"
                                            handleDiameter={30}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            className="react-switch"
                                            id="material-switch" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" xs="8">
                                    <CardText><FiBell/> Notificar via push</CardText>
                                </Col>
                                <Col>
                                <label>
                                        <Switch
                                            checked={this.state.checkedPush}
                                            onChange={this.handleChangePush}
                                            onColor="#a85bd5"
                                            onHandleColor="#8b1acc"
                                            handleDiameter={30}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            className="react-switch"
                                            id="material-switch" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" xs="8">
                                <CardText><MdVibration/> Vibrar ao notificar</CardText>
                                </Col>
                                <Col>
                                    <label>
                                        <Switch
                                            checked={this.state.checkedVibrate}
                                            onChange={this.handleChangeVibrate}
                                            onColor="#a85bd5"
                                            onHandleColor="#8b1acc"
                                            handleDiameter={30}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            className="react-switch"
                                            id="material-switch" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" xs="8">
                                <CardText><FiVolume2/> Som</CardText>
                                </Col>
                                <Col>
                                    <label>
                                        <Switch
                                            checked={this.state.checkedSound}
                                            onChange={this.handleChangeSound}
                                            onColor="#a85bd5"
                                            onHandleColor="#8b1acc"
                                            handleDiameter={30}
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={48}
                                            className="react-switch"
                                            id="material-switch" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <CardText>Intervalo de notificação</CardText>
                                </Col>
                                <Col>
                                
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </div>
            </>
        );
    }

}

export default Settings;