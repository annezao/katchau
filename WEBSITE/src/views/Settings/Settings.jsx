import React from "react";
import Switch from "react-switch";
import './style.css'

/*Icones*/
import { FiMail, FiVolume2 } from 'react-icons/fi';
import { MdVibration, MdNotifications } from 'react-icons/md';

// reactstrap components
import {
  Card,
  Input,
  Button,
  FormGroup,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

import configServices from "../../services/settings";

class Settings extends React.Component {
	// roxo"#a85bd5"
    // "#8b1acc"
    // verde "#d3d3d3",
    // "#4CAF50"
    constructor() {
        super();
        this.state = {
            checkedEmail: false,
            checkedPush: false,
            checkedVibrate: false,
            checkedSound: false,
            checkedInterval: false,
            onColor: "#a85bd5",
            onHandleColor: "#8b1acc",
            // value: 0,
            limit: 0,
            id: null
        };
            
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePush = this.handleChangePush.bind(this);
        this.handleChangeVibrate = this.handleChangeVibrate.bind(this);
        this.handleChangeSound = this.handleChangeSound.bind(this);
        // this.handleChangeInterval = this.handleChangeInterval.bind(this);
        this.handleChangeLimit = this.handleChangeLimit.bind(this);
        //
        this.handleLoadingStatus = this.handleLoadingStatus.bind(this)
      }

    componentDidMount() {
        var component = this;
        component.handleLoadingStatus(true);

        configServices.readConfig(1)
            .then(function (res) {
            const config = res.data;
            if (!!config) {

                // localStorage.setItem("config", JSON.stringify({
                //     notificar_email: config.get("notificar_email"),
                //     notificar_push: config.get("notificar_push"),
                //     limite: config.get("limite")
                // }));

                component.setState({
                    id: config.id,
                    checkedEmail: config.email_notifications,
                    checkedPush: config.push_notifications,
                    checkedVibrate: config.vibrate,
                    checkedSound: config.sound,
                    // value: config.attributes.intervalo_notificar,
                    limit: config.time_interval
                });
            }
            else {
                component.props.notify({
                    place: "tr",
                    message: "Ocorreu um erro ao carregar configurações.",
                    type: "danger",
                    icon: "tim-icons icon-alert-circle-exc"
                });
            }
            
            console.log(config);
            component.props.handleLoadingStatus(false);
        })
        .catch(function (error) {
            component.props.handleLoadingStatus(false);

            component.props.notify({
                place: "tr",
                message: ("Error: " + error.code + " " + error.message),
                type: "danger",
                icon: "tim-icons icon-alert-circle-exc"
            });
            console.log("Error: " + error.code + " " + error.message);
        });
    }      

    //funcao do componente pai para mudar o status da barra de progresso (Admin.jsx -> linha 162)
    handleLoadingStatus (value) {
          this.props.handleLoadingStatus(value);
    }      

    updateConfig(checkedEmail, checkedPush, checkedVibrate, checkedSound, limit, callback) {

        var component = this;

        configServices
            .updatingConfig(
                component.state.id,
                checkedEmail,
                checkedPush,
                checkedVibrate,
                checkedSound,
                // value,
                limit)
            .then(function (config) {
                if (!!config) {
                    console.log(config);
                    localStorage.setItem("config", JSON.stringify({
                        notificar_email: config.get("notificar_email"),
                        notificar_push: config.get("notificar_push"),
                        limite: config.get("limite")
                    }));
                    component.setState({
                        id: config.id,
                        checkedEmail: config.attributes.notificar_email,
                        checkedPush: config.attributes.notificar_push,
                        checkedVibrate: config.attributes.vibrate,
                        checkedSound: config.attributes.som,
                        // value: config.attributes.intervalo_notificar,
                        limit: config.attributes.limite
                    });
                    callback();
                }
                component.props.handleLoadingStatus(false);
            })
            .catch(function (error) {
                component.props.handleLoadingStatus(false);

                component.props.notify({
                    place: "tr",
                    message: ("Error: " + error.code + " " + error.message),
                    type: "danger",
                    icon: "tim-icons icon-alert-circle-exc"
                });
                console.log("Error: " + error.code + " " + error.message);
            });
    }
     
    handleChangeEmail(checked) {
        this.handleLoadingStatus(true);

        this.updateConfig(
            checked,
            this.state.checkedPush,
            this.state.checkedVibrate,
            this.state.checkedSound,
            // this.state.value,
            this.state.limit,
            () => this.setState({ checkedEmail: checked })
        );
    }
    handleChangePush(checked) {
        this.handleLoadingStatus(true);

        this.updateConfig(
            this.state.checkedEmail,
            checked,
            this.state.checkedVibrate,
            this.state.checkedSound,
            // this.state.value,
            this.state.limit,
            () => this.setState({ checkedPush: checked })
        );
    }
    handleChangeVibrate(checked) {
        this.handleLoadingStatus(true);

        this.updateConfig(
            this.state.checkedEmail,
            this.state.checkedPush,
            checked,
            this.state.checkedSound,
            // this.state.value,
            this.state.limit,
            () => this.setState({ checkedVibrate: checked })
        );
    }
    handleChangeSound(checked) {
        this.handleLoadingStatus(true);

        this.updateConfig(
            this.state.checkedEmail,
            this.state.checkedPush,
            this.state.checkedVibrate,
            checked,
            // this.state.value,
            this.state.limit,
            () => this.setState({ checkedSound: checked })
        );
    }
    // handleChangeInterval(e) {
    //     this.handleLoadingStatus(true);
    //     let value = parseInt(e.target.value);

    //     this.updateConfig(
    //         this.state.checkedEmail,
    //         this.state.checkedPush,
    //         this.state.checkedVibrate,
    //         this.state.checkedSound,
    //         value,
    //         this.state.limit,
    //         () => this.setState({ value })
    //     );
    // }
    handleChangeLimit(e) {
        this.handleLoadingStatus(true);
        let limit = parseInt(e.target.parentElement.parentNode.querySelector("input").value);

        this.updateConfig(
            this.state.checkedEmail,
            this.state.checkedPush,
            this.state.checkedVibrate,
            this.state.checkedSound,
            // this.state.value,
            limit,
            () => this.setState({ limit })
        );
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
                        {
                            this.state.checkedPush ?
                            <>
                                <Row>
                                    <Col sm="6" xs="8">
                                        <CardText><MdVibration /> Vibrar ao notificar</CardText>
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
                                        <CardText><FiVolume2 /> Som</CardText>
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
                                {/* <Row>
                                    <Col>
                                        <CardText><MdNotificationsActive /> Intervalo de notificação</CardText>
                                    </Col>
                                    <Col>
                                        <div className="slidecontainer">
                                            <input type="range" min={1} max={24} onMouseUp={this.handleChangeInterval} value={this.state.value} className="slider" id="myRange" onChange={this.onChangeValue}>
                                            </input>


                                            <Row>
                                                <Col><p>{this.state.value}h</p></Col>
                                                <Col><p style={{ textAlign: 'right' }}>24h</p></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col className="pr-md-1" sm="3" xs="3">
                                        <FormGroup>
                                        <p>Limite</p>
                                        <Input
                                            defaultValue={this.state.limit}
                                            placeholder="0 kW"
                                            type="number"/>
                                        </FormGroup>
                                    </Col>
                                    <Col className="botao">
                                        <Button onClick={this.handleChangeLimit}
                                        className="btn-fill" color="primary" type="button">
                                            Salvar limite
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                            :
                            ""                                
                        }
                        </CardBody>
                    </Card>
                </Row>
            </div>
            </>
        );
    }
    onChangeValue = (e) => this.setState({ value: parseInt(e.target.value)});
}

export default Settings;