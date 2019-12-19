import React from "react";

import moment from "moment";
import "moment/locale/pt-br";

// import { spawnNotification, sendEmail } from '../../services/notification'

import {
  CardTitle,
  CardHeader
} from "reactstrap";

// core components
import {
  mainCharts,
  readVoltage
} from "../../services/charts";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

export default class Chart extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      watts: 0,
      data: [],
      date: props.state.date,
      options: null,
      loading: true,
      progressMsg: "Carregando dados do dispositivo...",
      interval: null
    };

    this.getChartOptions = this.getChartOptions.bind(this);
    this._getChartDataService = this._getChartDataService.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.getState = this.getState.bind(this);
    this.setUniqueInterval = this.setUniqueInterval.bind(this);
  }
  //função criada para pegar o estado do componente chart
  getState(){
    this.props.getChildState(this.state)
  }

  //primeira chamada de função ao criar o componente
  componentDidMount() {
    moment.locale('pt-br');
    this._getChartDataService();
  }

  componentWillUnmount() {
    console.log(`Cleaning interval for ${this.props.bigChartData}.`);   
    clearInterval(this.state.interval);
  }

  setUniqueInterval() {
    this._getChartDataService();
  }

   //método que pega dados do parse
   _getChartDataService() {

     let component = this;
     console.log(`Requesting ${component.props.bigChartData} potencies.`);
     component.props.handleLoadingStatus(true);

    readVoltage(component.props.bigChartData, component.props.device.id, component.state.date)
      .then(function (voltages) {

        if (!!component.state.interval) {
          console.log(`Cleaning existent ${component.props.bigChartData} interval.`);
          clearInterval(component.state.interval);
        }

        //  VAI REPETIR O MÉTODO DE 1 EM 1 MINUTO !!   
        console.log(`Setting interval for ${component.props.bigChartData}.`);     
        var interval =
          setInterval(() => {
            console.log(`Getting interval for ${component.props.bigChartData} and the selected is ${component.props.selectedChart}...`);
            if (component.props.bigChartData === component.props.selectedChart) {
              console.log("...reloading with interval");
              component._getChartDataService();
            }
          }, 60000); //1min

        if (voltages.length) {
          let min = voltages.reduce((min, p) => p.y < min ? p.y : min, voltages[0].y),
            max = voltages.reduce((acc, curr) => acc + curr.y, 0);

          min = Number(min.toFixed(2));
          max = Number(max.toFixed(2));
            
          let config = JSON.parse(localStorage.getItem("config"));       
          if (!!config && config.notificar_push){
            if (max > config.limite) {
              //spawnNotification('Alerta!', `Identificamos que seu limite de ${max} foi ultrapassado`);
            }
          }

          if (!!config && config.notificar_push) {
            if (max > config.limite) {
              //sendEmail('Alerta!', `Identificamos que seu limite de ${max} foi ultrapassado`);
            }
          }

          component.setState({
            data: voltages,
            options: component.getChartOptions(min, max),
            watts: max,
            loading: false,
            interval
          });
        }
        else {
          if(!!component.state.interval){
            clearInterval(component.state.interval);
          }
          component.setState({
            data: [],
            options: null,
            loading: false,
            watts: 0,
            interval,
            progressMsg: "Não há dados para serem mostrados."
          });
        }

        component.props.handleLoadingStatus(false);

      }).catch(function (error) {
        console.log("Error: " + error);

        if (error.response.status === 401) {
            localStorage.setItem('shallnotpass', "hold on")
            window.location.href = '/login';
        }
        else {
            if (!!component.state.interval) {
              clearInterval(component.state.interval);
            }

            component.setState({
              data: [],
              options: null,
              loading: false,
              watts: 0,
              progressMsg: "Ocorreu um erro ao buscar dados do dispositivo."
            });

            component.props.handleLoadingStatus(false);
        }
      });
  }

  //método auxiliar para pegar opções do charts (o plugin pega as options e data separadamente)
  getChartOptions(min, max) {
    return mainCharts[this.props.bigChartData].options(min, max, this.state.date);
  }

  //roda quando renderiza o componente do chart
  getChartData(canvas) {
    let ctx = canvas.getContext("2d");
    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(208, 72, 182, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(208, 72, 182, 0.0)");
    gradientStroke.addColorStop(0, "rgba(208, 72, 182, 0)"); //purple colors

    let config = {}
    config.datasets = mainCharts[this.props.bigChartData].datasets(this.state.data, gradientStroke);
    config.labels = mainCharts[this.props.bigChartData].labels(this.state.date);

    return config;
  }
  
  render(){
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
          <h3 className="col">{component.state.progressMsg}</h3>
        </div>;
    }

    let legend = this.props.legend;
    //para mostrar kW apenas de Dia
    let cardTitle = this.props.bigChartData === "dia" ? 
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