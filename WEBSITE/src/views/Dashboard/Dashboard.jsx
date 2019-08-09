import moment from "moment";
import "moment/locale/pt-br";
/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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
  mainCharts
} from "../../variables/charts";


import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {pt} from 'date-fns/locale';

import "./style.css";

registerLocale('pt', pt);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    let m = moment();

    this.state = {
      bigChartData: "dia",
      id: 0,
      chart: {
        watts: 0
      },
      day: m.toDate(),
      month: (m.month() + 1),
      loading: true,
      loadingMsg: "",
      empty: false
    };

    this.getChartOptions = this.getChartOptions.bind(this);
    this._getChartDataService = this._getChartDataService.bind(this);
    this.getData = this.getData.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.setBgChartData = this.setBgChartData.bind(this);
    this.changeChartMonth = this.changeChartMonth.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    moment.locale('pt-br');
    console.log("componentDidMount");
    this.setState({
      loadingMsg: "Carregando dados..."
    });
    this._getChartDataService();
  }

  _getChartDataService() {
    //  timeout para simular loading
    setTimeout(() => {

      this.setState({
        loadingMsg: "Construindo gráfico..."
      });

      const { id } = this.props.match.params;
      console.log("id device: ", id);

      let result = [];

      switch (this.state.bigChartData) {
        case "dia":
          result = mainCharts[this.state.bigChartData].values(this.state.day)
          break;
        case "mes":
          result = mainCharts[this.state.bigChartData].values(this.state.month)
          break;
        default:
          result = mainCharts[this.state.bigChartData].values;
          break;
      }

      if(result.length > 0){
          let min = result.length > 0 ? result[0].y : 0,
            max = result.length > 0 ? result[result.length - 1].y : 0;

          this.setState({
            id,
            chart: {
              data: result,
              options: this.getChartOptions(min, max),
              minWatts: min,
              maxWatts: max,
              watts: max
            },
            loading: false,
            empty: false
          });
      }
      else {
        this.setState({
          id,
          loading: false,
          empty: true,
          chart: {
            watts: 0
          }
        });
      }

      }, 2000);
  }

  getChartOptions(min, max) {
    return mainCharts[this.state.bigChartData].options(min, max);
  }

  getData(gradientStroke) {
    console.log("getData - current month: ", this.state.month)
    let config = this.state.chart;
    config.datasets = mainCharts[this.state.bigChartData].datasets(this.state.chart.data, gradientStroke);

    if (this.state.bigChartData !== "mes") config.labels = mainCharts[this.state.bigChartData].labels;
    else config.labels = mainCharts[this.state.bigChartData].labels(this.state.month);

    console.log(config.labels);
    return config;
  }

  getChartData(canvas) {
    console.log("getChartData")
    let ctx = canvas.getContext("2d");
    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(208, 72, 182, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(208, 72, 182, 0.0)");
    gradientStroke.addColorStop(0, "rgba(208, 72, 182, 0)"); //purple colors

    return this.getData(gradientStroke);
  }

  setBgChartData = (e, name) => {
    e.preventDefault()
    console.log("setBgChartData - ", name)

    this.setState({
      bigChartData: name,
      loading: true,
      empty: false,
      loadingMsg: "Carregando dados...",
      chart: {
        watts: 0
      }
    });

    this._getChartDataService();
  }

  changeChartMonth(event) {
    this.setState({
      month: event.target.value,
      loading: true,
      empty: false,
      loadingMsg: "Carregando dados...",
      chart: {
        watts: 0
      }
    });

    this._getChartDataService();
  }

  handleChange(date) {
    this.setState({
      day: date,
      loading: true,
      empty: false,
      loadingMsg: "Carregando dados...",
      chart: {
        watts: 0
      }
    });

    this._getChartDataService();
  }

  render() {

    const component = this;
    let element = "", legend = "";
    console.log("render() - state:", component.state)

    if(!component.state.empty){
      if (component.state.loading) {
        element =
          <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
            <h3 className="col">{component.state.loadingMsg}</h3>
          </div>;
      } else {
        element = <Line
          data={component.getChartData}
          options={component.state.chart.options}
        />
      }
    }
    else {
      element =
        <div className="loading mx-auto text-center row align-items-center" style={{ height: 100 + '%' }}>
          <h3 className="col">Não há dados para serem mostrados.</h3>
        </div>;
    }

    if (component.state.bigChartData === "dia") {
      legend = <>
        <DatePicker
          selected={this.state.day}
          onChange={this.handleChange}
          locale="pt"
          dateFormat="d MMMM, yyyy"
          showYearDropdown
          withPortal
          maxDate={moment().toDate()}
        />
        <h5 className="mt-2 card-category text-lowercase">já foram gastos</h5>
        <CardTitle tag="h2">
          <i className="tim-icons icon-bulb-63 text-primary"></i>
          {component.state.chart.watts} <small style={{ fontSize: 1 + 'rem' }}>kW</small>
        </CardTitle>
      </>
    }
    else {
      if (component.state.bigChartData === "mes") {
        legend = <div className="col-md-6 mb-3">
          <Label for="mes">Mês</Label>
          <Input type="select" name="select" id="mes" defaultValue={component.state.month} onChange={component.changeChartMonth} >
            <option value={moment().add(-2, 'M').month() + 1}>{moment().add(-2, 'M').format("MMMM")}</option>
            <option value={moment().add(-1, 'M').month() + 1}>{moment().add(-1, 'M').format("MMMM")}</option>
            <option value={moment().month() + 1}>{moment().format("MMMM")}</option>
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
