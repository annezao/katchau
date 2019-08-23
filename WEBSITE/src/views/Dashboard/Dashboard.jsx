import moment from "moment";
import "moment/locale/pt-br";

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// import routes from '../routes'

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
  Input,
  Label,
} from "reactstrap";
// core components
import {
  mainCharts,
  readVoltage
} from "../../variables/charts";

import { readDevice } from '../../variables/devices';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {pt} from 'date-fns/locale';

import "./style.css";

registerLocale('pt', pt);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bigChartData: "dia",
      watts: 0,
      data: [],
      date: new Date(),
      options: null,
      loading: true,
      progressMsg: "Buscando dados do dispositivo...",
      device: null
    };

    this.getChartOptions = this.getChartOptions.bind(this);
    this._getChartDataService = this._getChartDataService.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setBgChartData = this.setBgChartData.bind(this);
    this.changeChartMonth = this.changeChartMonth.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    moment.locale('pt-br');
    console.log("componentDidMount");

    const { id } = this.props.match.params;
    console.log("id device: ", id);

    let component = this;

    readDevice(id)
      .then(function (device) {

        console.log("device: ", device);

        component.setState({
          device: device,
          progressMsg: "Carregando dados do dispositivo..."
        });

        component._getChartDataService();

      }).catch(function (error) {
        console.log("Error: ", error);

        component.setState({
          loading: false,
          data: [],
          progressMsg: "Ocorreu um erro ao buscar dados do dispositivo."
        });
      });
  }

  //método que pega dados do parse
  _getChartDataService() {

    let component = this;

    readVoltage(component.state.bigChartData, this.state.device, component.state.date)
      .then(function (voltages) {

        console.log("voltages: ", voltages);

        if (voltages.length > 0) {
          let min = voltages.length > 0 ? voltages[0].y : 0,
            max = voltages.length > 0 ? voltages[voltages.length - 1].y : 0;

          component.setState({
            data: voltages,
            options: component.getChartOptions(min, max),
            watts: max,
            loading: false
          });
        }
        else {
          component.setState({
            data: [],
            options: null,
            loading: false,
            watts: 0
          });
        }

      }).catch(function (error) {
        console.log("Error: " + error);

        component.setState({
          data: [],
          options: null,
          loading: false,
          watts: 0
        });
      });
  }

  //método auxiliar para pegar opções do charts (o plugin pega as options e data separadamente)
  getChartOptions(min, max) {
    return mainCharts[this.state.bigChartData].options(min, max, this.state.date);
  }

  //roda quando renderiza o componente do chart
  getChartData(canvas) {
    console.log("getChartData")
    let ctx = canvas.getContext("2d");
    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(208, 72, 182, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(208, 72, 182, 0.0)");
    gradientStroke.addColorStop(0, "rgba(208, 72, 182, 0)"); //purple colors

    let config = {}
    config.datasets = mainCharts[this.state.bigChartData].datasets(this.state.data, gradientStroke);
    config.labels = mainCharts[this.state.bigChartData].labels(this.state.date);

    return config;
  }

  //roda quando seleciona dia, mês ou ano
  setBgChartData = (e, name) => {
    e.preventDefault()
    console.log("setBgChartData - ", name)

    this.setState({
      bigChartData: name,
      loading: true,
      data: [],
      progressMsg: "Carregando dados...",
      watts: 0
    }, function () {
      this._getChartDataService();
    });
  }

  //roda quando seleciona o mês no dropdown
  changeChartMonth(event) {
    this.setState({
      date: moment(event.target.value, "MM").toDate(),
      loading: true,
      progressMsg: "Carregando dados...",
      watts: 0,
      data: []
    }, function(){
        this._getChartDataService();
    });
  }

  //roda quando seleciona a data no datepicker
  handleChange(date) {
    this.setState({
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
      loading: true,
      data: [],
      watts: 0,
      progressMsg: "Carregando dados...",
    }, function () {
      this._getChartDataService();
    });
  }

  render() {

    const component = this;
    let element = "", legend = "";

    if (component.state.loading) {
      element =
        <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
          <h3 className="col">{component.state.progressMsg}</h3>
        </div>;
    } else {
      if (component.state.data.length) {
        element = <Line
          data={component.getChartData}
          options={component.state.options}
        />
      }
      else {
        element =
          <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
            <h3 className="col">Não há dados para serem mostrados.</h3>
          </div>;
      }
    }

    if (component.state.bigChartData === "dia") {
      legend = <>
        <DatePicker
          selected={component.state.date}
          onChange={component.handleChange}
          locale="pt"
          dateFormat="d MMMM, yyyy"
          showYearDropdown
          withPortal
          maxDate={new Date()}
        />
        <h5 className="mt-2 card-category text-lowercase">já foram gastos</h5>
        <CardTitle tag="h2">
          <i className="tim-icons icon-bulb-63 text-primary"></i>
          {component.state.watts} <small style={{ fontSize: 1 + 'rem' }}>kW</small>
        </CardTitle>
      </>
    }
    else {
      if (component.state.bigChartData === "mes") {
        legend = <div className="col-md-6 mb-3">
          <Label for="mes">Mês</Label>
          <Input type="select" name="select" id="mes" defaultValue={(component.state.date.getMonth()+1).toString()} onChange={component.changeChartMonth} >
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </Input>
        </div>
      }
    }

    return (
      <>
        <div className="content pb-0">
          <Row>
            <Col xs="12">
              <Card className="card-chart mb-0">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6" xs="12">
                      {legend}
                    </Col>
                    <Col sm="6" xs="12">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: component.state.bigChartData === "dia"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={(event) => component.setBgChartData(event, "dia")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span>
                            Dia
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: component.state.bigChartData === "mes"
                          })}
                          onClick={(event) => component.setBgChartData(event, "mes")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span>
                            Mês
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: component.state.bigChartData === "ano"
                          })}
                          onClick={(event, ) => component.setBgChartData(event, "ano")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span>
                            Ano
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area custom">
                    {element}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Dashboard;
