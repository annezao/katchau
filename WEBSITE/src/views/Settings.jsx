import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col
} from "reactstrap";

class Settings extends React.Component {
  render() {
    return (
        <>
        <div className="content">
            <Row>
                <Card className="card">
                    <CardHeader>
                    <CardTitle tag="h2">Configurações</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            Notificar via e-amil
                        </CardText>
                        <CardText>
                            Notificar via push
                        </CardText>
                        <CardText>
                            Vibrar ao notificar
                        </CardText>
                        <CardText>
                            Som
                        </CardText>
                        <CardText>
                            Intervalo de notificação
                        </CardText>
                    </CardBody>
                </Card>
            </Row>
        </div>
        </>
    );
  }
}

export default Settings;