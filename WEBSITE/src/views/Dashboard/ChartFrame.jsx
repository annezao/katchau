import React from "react";
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

import deviceServices from '../../services/devices';

export default class ChartFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "dia",
      // chat1:true,
      // chart2:false,
      // chart3:false,
      // id: 0,
      // title: "",
      // body: "",
      device: props.device,
      loading: true,
      loadingMsg: "Buscando dados do dispositivo..."
    };
  }

  componentDidMount() {

    const { id } = this.state.device;
    console.log("id device: ", id);

    let component = this;

    deviceServices.readDevice(id)
      .then(function (device) {

        console.log("device: ", device);

        if (!!device) {
          component.setState({
            loading: false,
            device: device
          });
        }
        else {
          component.setState({
            loading: true,
            data: [],
            loadingMsg: "Ocorreu um erro ao buscar dados do dispositivo."
          });
        }

      }).catch(function (error) {

        console.log("Error: ", error);

        if (error.response.status === 401) {
          localStorage.setItem('shallnotpass', "hold on")
          window.location.href = '/login';
        }
        else {
          component.setState({
            loading: true,
            data: [],
            loadingMsg: "Ocorreu um erro ao buscar dados do dispositivo."
          });

          component.props.handleLoadingStatus(false);
        }
      });
  }

  setBgChartData1 = name => {
    this.setState({
      bigChartData: name
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

        {
          this.state.loading ?
            <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
              <h3 className="col">{this.state.loadingMsg}</h3>
            </div>
            : (
              <Col xs="12">
                <Card className="card-chart mb-0">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6" xs="12">
                        <CardTitle tag="h2" className="m-0">Gráficos</CardTitle>
                      </Col>
                      <Col sm="6" xs="12">
                        <ButtonGroup
                          className="btn-group-toggle float-right"
                          data-toggle="buttons">
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {
                              active: this.state.bigChartData === "dia"
                            })}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => this.setBgChartData1("dia")}
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
                              active: this.state.bigChartData === "mes"
                            })}
                            onClick={() => this.setBgChartData2("mes", true)}
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
                              active: this.state.bigChartData === "ano"
                            })}
                            onClick={() => this.setBgChartData3("ano", true)}
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
                    <div className={this.state.bigChartData === "dia" ? '' : 'hidden'}>
                      <Dia
                        selectedChart={this.state.bigChartData}
                        handleLoadingStatus={this.props.handleLoadingStatus}
                        device={this.state.device} />
                    </div>
                    <div className={this.state.bigChartData === "mes" ? '' : 'hidden'}>
                      {this.state.chart2 ?
                        <Mes
                          selectedChart={this.state.bigChartData}
                          handleLoadingStatus={this.props.handleLoadingStatus}
                          device={this.state.device} /> :
                        <></>
                      }
                    </div>
                    <div className={this.state.bigChartData === "ano" ? '' : 'hidden'}>
                      {
                        this.state.chart3 ?
                          <Ano
                            selectedChart={this.state.bigChartData}
                            handleLoadingStatus={this.props.handleLoadingStatus}
                            device={this.state.device} /> :
                          <></>
                      }
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
        }

      </Row>
    )
  }
        
}