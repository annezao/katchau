import React from "react";

import moment from "moment";
import "moment/locale/pt-br";

import {
  CardTitle,
  CardHeader
} from "reactstrap";

// core components
import {
  mainCharts,
  readVoltage
} from "../../variables/charts";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

import { readDevice } from '../../variables/devices';

export default class Chart extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      watts: 0,
      data: [],
      date: props.state.date,
      options: null,
      loading: true,
      progressMsg: "Buscando dados do dispositivo...",
      device: null
    };
    console.log(props);    
  //   this._getChartDataService = this._getChartDataService.bind(this);
    this.getChartOptions = this.getChartOptions.bind(this);
    this._getChartDataService = this._getChartDataService.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getState = this.getState.bind(this);
  }
  //função criada para pegar o estado do componente chart
  getState(){
    this.props.getChildState(this.state)
  }

  //primeira chamada de função ao criar o componente
  componentDidMount() {
    moment.locale('pt-br');
    console.log("componentDidMount");

    const { id } = this.props.device;
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

        if (error.code === 209) {
          component.props.history.push('/login');
        }
        else {
          component.setState({
            loading: false,
            data: [],
            progressMsg: "Ocorreu um erro ao buscar dados do dispositivo."
          });
        }
      });
  }

   //método que pega dados do parse
   _getChartDataService() {

     let component = this;
     component.props.handleLoadingStatus(true);

    readVoltage(component.props.state.bigChartData, component.state.device, component.state.date)
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

        component.props.handleLoadingStatus(false);

      }).catch(function (error) {
        console.log("Error: " + error);

        if (error.code === 209) {
          component.props.history.push('/login');
        }
        else {          
          component.setState({
            data: [],
            options: null,
            loading: false,
            watts: 0
          });
        }

        component.props.handleLoadingStatus(false);
      });
  }

  //método auxiliar para pegar opções do charts (o plugin pega as options e data separadamente)
  getChartOptions(min, max) {
    return mainCharts[this.props.state.bigChartData].options(min, max, this.state.date);
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
    config.datasets = mainCharts[this.props.state.bigChartData].datasets(this.state.data, gradientStroke);
    config.labels = mainCharts[this.props.state.bigChartData].labels(this.state.date);

    return config;
  }
  
  render(){
    console.log('chart');
    const component = this;
    let element = "";
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

    let legend = this.props.legend;
    //para mostrar kW apenas de Dia
    let cardTitle = this.props.state.bigChartData === "dia" ? 
      <>
        <CardTitle tag="h2">
          <i className="tim-icons icon-bulb-63 text-primary"></i>
          {this.state.watts} <small style={{ fontSize: 1 + 'rem' }}>kW</small>
        </CardTitle> 
      </>: <></>;
     
    return (
      <>
      <CardHeader className="pt-0">
        {this.props.value ? legend :<></>}
        {cardTitle}
      </CardHeader>
      <div className="chart-area custom">
        {element}
      </div>
      </>
    );
  }
        
}