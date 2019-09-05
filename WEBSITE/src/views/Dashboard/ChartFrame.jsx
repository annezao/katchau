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
      chat1:true,
      chart2:false,
      chart3:false,
      id: 0
    };
  }

  setBgChartData1 = name => {
    this.setState({
      bigChartData: name,
    });
  };

  setBgChartData2 = name => {
    this.setState({
      bigChartData: name,
      chart2:true,
    });
  };
  setBgChartData3 = name => {
    this.setState({
      bigChartData: name,
      chart3:true,
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
                    data-toggle="buttons">
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data1"
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => this.setBgChartData1("data1")}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span>Dias</span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data2"
                      })}
                      onClick={() => this.setBgChartData2("data2", true)}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span>Mês</span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: this.state.bigChartData === "data3"
                      })}
                      onClick={() => this.setBgChartData3("data3", true)}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span>Ano</span>
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
              {this.state.chart2 ? <Mes 
                device={this.props.device}/> : <></>}
                
              </div>
              <div className={this.state.bigChartData === "data3" ? '' : 'hidden'}>
              {this.state.chart3 ? <Ano 
                device={this.props.device}/> : <></>
              }
              </div>
            </CardBody>
          </Card>
        </Col>
    </Row>)
    }
        
}