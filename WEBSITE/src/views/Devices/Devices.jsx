import  React from 'react'
import devices from '../../variables/devices'
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
        devices : []
    }

    componentDidMount(){
        this.loadDevices();
    }

    loadDevices(){
        this.setState(
            {
                devices: devices
            }
        )
    }

    render(){
        return(
            <div className="content">
                <Row>
                    {
                    this.state.devices.map( (devices, key) => (
                    <Col key={key} sm="4">
                        <article key={devices._id}>
                           <Card id="card-list">
                               <CardHeader id="cardheader-list">
                               <Row>
                                <Col>
                                        <p className="header-title">{devices.name}</p>
                                </Col>
                                <Col>
                                        <img src={logo} alt="logo" className="logo"></img>
                                </Col>
                               </Row>
                               </CardHeader>
                               <CardBody className="cardbody-list">
                                    <CardText className="card-description">{devices.description}</CardText>
                                    <Link to={`dashboard/${devices._id}`} id="dash-btn">Acessar Dashboard</Link>
                               </CardBody>
                           </Card>
                        </article>
                    </Col>
                        )
                    )
                    }
                </Row>
            </div> 
                
        );
    }
}

export default Divices;