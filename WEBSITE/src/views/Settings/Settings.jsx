import React from "react";
import Switch from "react-switch";
import './style.css'

/*Icones*/
import { FiMail, FiVolume2 } from 'react-icons/fi';
import { MdVibration, MdNotifications, MdNotificationsActive } from 'react-icons/md';

// reactstrap components
import {
  Card,
 // CardHeader,
 // CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

class Settings extends React.Component {
	// roxo"#a85bd5"
    // "#8b1acc"
    // verde "#d3d3d3",
    // "#4CAF50"
    constructor() {
        super();
        this.state = {
            checkedEmail: true,
            checkedPush: true,
            checkedVibrate: true,
            checkedSound: true,
            checkedInterval: true,
            onColor: "#a85bd5",
            onHandleColor: "#8b1acc",
            value: 1
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
                                            onColor={this.state.onColor}
                                            onHandleColor={this.state.onHandleColor}
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
                                    <CardText><MdNotifications/> Notificar via push</CardText>
                                </Col>
                                <Col>
                                <label>
                                        <Switch
                                            checked={this.state.checkedPush}
                                            onChange={this.handleChangePush}
                                            onColor={this.state.onColor}
                                            onHandleColor={this.state.onHandleColor}
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
                                            onColor={this.state.onColor}
                                            onHandleColor={this.state.onHandleColor}
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
                                            onColor={this.state.onColor}
                                            onHandleColor={this.state.onHandleColor}
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
                                <CardText><MdNotificationsActive/> Intervalo de notificação</CardText>
                                </Col>
                                <Col>
                                <div className="slidecontainer">
                                    <input type="range" min={1} max={24} value={this.state.value} className="slider" id="myRange" onChange={this.onChangeValue}>
                                    </input> 
                                    
                                    
                                    <Row>
                                        <Col><p>{this.state.value}h</p></Col>
                                        <Col><p style={{textAlign: 'right'}}>24h</p></Col>
                                    </Row>
                                </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </div>
            </>
        );
    }
    onChangeValue = (e) => this.setState({value: e.target.value});
}

export default Settings;