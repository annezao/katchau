import React from "react";
import Chart from './Chart';
// reactstrap components

import moment from "moment";
import "moment/locale/pt-br";

import {
    Input,
    Label,
    Col,
  } from "reactstrap";

export default class Mes extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          bigChartData: "mes",
          date: new Date(),
          value: true,
        };
      this.changeChartMonth = this.changeChartMonth.bind(this);
     // this.getLegend = this.getLegend.bind(this);
  }

  componentDidMount() {
    moment.locale('pt-br');
  }

  //roda quando seleciona o mês no dropdown
  changeChartMonth(event) {
    this.setState({
      date: moment(event.target.value, "MM").toDate(),
    })
    console.log(this.state.date);
    this.refs.child.setState({
      date: moment(event.target.value, "MM").toDate(),
      loading: true,
      progressMsg: "Carregando dados...",
      watts: 0,
      data: []
    }, function(){
        this._getChartDataService();
    });
  }

    render(){
      const legend =  
      <Col className="mb-3 p-0" sm="3">
          <Label for="mes">Mês</Label>
          <Input type="select" name="select" id="mes" defaultValue={(this.state.date.getMonth()+1).toString()} onChange={this.changeChartMonth} >
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
      </Col>;
      return (
        <Chart
          handleLoadingStatus={this.props.handleLoadingStatus}
          legend={legend}
          state={this.state}
          device={this.props.device}
          value={true}
          ref="child"/>
        )
    }
}