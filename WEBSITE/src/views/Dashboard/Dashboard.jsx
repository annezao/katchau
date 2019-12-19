import React from "react";

// import "./style.css";
import ChartFrame from "./ChartFrame";

class Dashboard extends React.Component {

  render() {
    return (
      <>
        <div className="content pb-0">
            <ChartFrame
                handleLoadingStatus={this.props.handleLoadingStatus}
                device={this.props.match.params}/>
        </div>
      </>
    )
  }
}

export default Dashboard;
