import React from "react";
import Chart from './Chart';

// import moment from "moment";
// import "moment/locale/pt-br";

export default class Ano extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            value: null,
          };
    }
    
    render(){        
        return ( 
            <Chart
                bigChartData={"ano"}
                selectedChart={this.props.selectedChart}
                handleLoadingStatus={this.props.handleLoadingStatus}
                legend={this.props.legend}
                state={this.state}
                device={this.props.device}
                value={false}
            />
        );
    }
}