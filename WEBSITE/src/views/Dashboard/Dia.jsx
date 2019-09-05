import React from "react";
import Chart from './Chart';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {pt} from 'date-fns/locale';

import "./style.css";

registerLocale('pt', pt);

export default class Dia extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            bigChartData: "dia",
            watts: 0,
            date: new Date(),
          };
      this.handleChange = this.handleChange.bind(this);
      this.getChildState = this.getChildState.bind(this);
    }

    //roda quando seleciona a data no datepicker
    handleChange(date) {
      this.refs.child.setState({
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),
        loading: true,
        data: [],
        watts: 0,
        progressMsg: "Carregando dados...",
      }, function () {
        this._getChartDataService();
        this.getState();
      });
    }
    //função para pegar o state da função chart
    getChildState(state){
      this.setState({date:state.date})
      console.log(this.state.watts)
    }

    render(){
      const component = this;
      let legend = <>
      <DatePicker
          selected={this.state.date}
          onChange={component.handleChange}
          locale="pt"
          dateFormat="d MMMM, yyyy"
          showYearDropdown
          withPortal
          maxDate={new Date()}
        />
        <h5 className="mt-2 card-category text-lowercase">já foram gastos</h5>
      </>
      return ( <>
          <Chart
          legend={legend}
          state={this.state}
          device={this.props.device}
          getChildState={this.getChildState}
          value={true}
          ref="child"/>
          </>
        );
    }
}