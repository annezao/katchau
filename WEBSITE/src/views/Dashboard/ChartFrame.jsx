import React from "react";

// nodejs library that concatenates classes
// import classNames from "classnames";
import "./style.css";

// nodejs library that concatenates classes
import classNames from "classnames";

// charts
import Dia from './Dia';
import Mes from './Mes';
import Ano from './Ano';

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

export default class ChartFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1",
      id: 0
    };
  }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
    render(){      
        return (
      <Row>
        <Col xs="12">
          <Card className="card-chart mb-0">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6" xs="12">
                <CardTitle tag="h2">Gráficos</CardTitle>
                </Col>
                <Col sm="6" xs="12">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data1"
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => this.setBgChartData("data1")}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Dias
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data2"
                      })}
                      onClick={() => this.setBgChartData("data2")}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Mês
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data3"
                      })}
                      onClick={() => this.setBgChartData("data3")}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Ano
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-tap-02" />
                      </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className={this.state.bigChartData === "data1" ? '' : 'hidden'}>
                <Dia 
                device={this.props.device}/>
              </div>
              <div className={this.state.bigChartData === "data2" ? '' : 'hidden'}>
                <Mes 
                device={this.props.device}/>
              </div>
              <div className={this.state.bigChartData === "data3" ? '' : 'hidden'}>
                <Ano 
                device={this.props.device}/>
              </div>
            </CardBody>
          </Card>
        </Col>
    </Row>)
    }
        
}