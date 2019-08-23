import  React from 'react'
import { readDevices } from '../../variables/devices'
import { Link } from 'react-router-dom'
import './style.css'
import logo from './logo.png'

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
} from 'reactstrap'

class Divices extends React.Component{
    state = {
        devices : [],
        loading: true,
        loadingMsg: "Carregando dispositivos..."
    }

    componentDidMount(){
        this.loadDevices();
    }

    loadDevices(){

        let component = this;

        readDevices()
        .then(function (devices) {

            console.log(devices);

            component.setState({
                loading: false,
                devices: devices
            });

        }).catch(function (error) {
            console.log("Error: " + error.code);

            component.setState({
                loading: false
            });
        });

    }

    render(){

        return(
            <div className="content">
                <Row>
                    {
                        this.state.loading ?
                            <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
                                <h3 className="col">{this.state.loadingMsg}</h3>
                            </div>
                        :
                            (
                                this.state.devices.length > 0 ?
                                    this.state.devices.map((devices, key) => (
                                            <Col key={key} sm="4">
                                                <article key={devices.id}>
                                                    <Card id="card-list">
                                                        <CardHeader id="cardheader-list">
                                                            <Row>
                                                                <Col>
                                                                <p className="header-title">{devices.attributes.name}</p>
                                                                </Col>
                                                                <Col>
                                                                    <img src={logo} alt="logo" className="logo"></img>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>
                                                        <CardBody className="cardbody-list">
                                                        <CardText className="card-description">{devices.attributes.description}</CardText>
                                                        <Link to={`dashboard/${devices.id}`} id="dash-btn">Acessar Dashboard</Link>
                                                        </CardBody>
                                                    </Card>
                                                </article>
                                            </Col>
                                        )
                                    )
                                    :
                                    <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
                                        <h3 className="col">no devices ~</h3>
                                    </div>
                            )
                            
                    }
                </Row>
            </div> 
                
        );
    }
}

export default Divices;