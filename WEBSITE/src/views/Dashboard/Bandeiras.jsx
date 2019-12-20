import React from "react";

import {
    CardHeader,
    CardTitle,
    Card,
    Row,
    Col,
  } from "reactstrap";

class Bandeiras extends React.Component {

  render() {
    return (
      <>
        <Row>
            <Col lg="2">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Bandeira Normal</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-coins text-primary" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="2">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Bandeira Branca</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-coins" />{" "}
                    763,215
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
        </Row>
      </>
    )
  }
}

export default Bandeiras;
