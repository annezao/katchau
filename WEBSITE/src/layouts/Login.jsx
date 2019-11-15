import React from 'react';
import Auth from '../services/auth';
import errors from '../variables/errors';

import Progress from 'components/ProgressBar/Progress'
import NotificationAlert from "react-notification-alert";
// import errorCode from "../variables/errors.jsx";

import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button,
    Card,
    CardBody,
    Form,
    Row,
    Col
} from "reactstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: 'katchaumarquinhos@gmail.com',
            password: 'secret',
            rememberMe: false,
            isLoading: true,
            redirectUrl: (props.location.redirectFrom ? props.location.redirectFrom : null )
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberMeClick = this.handleRememberMeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoadingStatus = this.handleLoadingStatus.bind(this);    
    }

    notify = (options) => {
        var _options = {
            place: "tr",
            autoDismiss: 6,
            ...options
        };
        this.refs.notificationAlert.notificationAlert(_options);
    };

    handleLoadingStatus(value) {
        this.setState({
            isLoading: value
        })
    }

    componentDidMount() {
        if (this.state.redirectUrl !== null || !!this.props.errorCode) {
            this.notify({
                icon: "tim-icons icon-bell-55",
                message: "Faça login para continuar.",
                type: "primary"
            });
        }
        this.handleLoadingStatus(false);
    }

    handleRememberMeClick() {
        this.setState({ rememberMe: !this.state.rememberMe });
    }

    handleUsernameChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        var _class = this;
        _class.handleLoadingStatus(true);

        Auth.signIn(this.state.email, this.state.password)
            .then((user) => {
                console.log('User logged with name: ' + user.username + ' and email: ' + user.email);
                const { history } = this.props;
                _class.handleLoadingStatus(false);
                history.push("/admin/dashboard");
        }, 
        (error) => {
            _class.notify({
                place: "tr",
                message: errors[error.code].message,
                type: "danger",
                icon: "tim-icons icon-alert-circle-exc"
            });
            console.log("Error on login: " + error.code + " " + error.message);
            _class.handleLoadingStatus(false);
        });

        return false;
    }

    // verifyUser() {
    //     console.log(Parse.User.current())
    // }

    render() {

        // const state = this;

        return (

            <div className="content">
                <Progress isAnimating={this.state.isLoading} />
                {/* {console.log(state.props)} */}
                {/* {console.log(Auth.isAuthenticated)} */}
                {/* <button onClick={this.verifyUser}>Current User</button> */}
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <div className="container">
                    <Row>
                        <Col md="12">
                            <Card className="card-user ml-auto mr-auto mt-5" style={{maxWidth: '330px'}}>
                                <CardBody>
                                    <div className="author">
                                        <div className="block block-one" />
                                        <div className="block block-two" />
                                        <div className="block block-three" />
                                        <div className="block block-four" />
                                        <img
                                            alt="..."
                                            className="avatar"
                                            src={"https://pbs.twimg.com/media/DMgZ2fxXUAEqrFP.jpg"}
                                        />
                                        <h3 className="description mb-2">Faça login</h3>
                                    </div>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormText color="muted text-center mb-4">
                                            Para testes use o email <b>katchaumarquinhos@gmail.com </b> 
                                            e a senha <b>secret</b>
                                        </FormText>
                                        <FormGroup>
                                            <Label for="exampleEmail">Email</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="exampleEmail"
                                                placeholder="Digite seu email"
                                                value={this.state.email}
                                                autoFocus onChange={this.handleUsernameChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="examplePassword">Senha</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="examplePassword"
                                                placeholder="Digite sua senha"
                                                autoComplete="off"
                                                value={this.state.password}
                                                onChange={this.handlePasswordChange}
                                                required
                                            />
                                        </FormGroup>
                                        {/* <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" onChange={this.handleRememberMeClick} />{' '}
                                                Lembrar senha
                                                <span className="form-check-sign">
                                                    <span className="check"></span>
                                                </span>
                                            </Label>
                                        </FormGroup> */}
                                        <div className="text-center pt-3">
                                            <Button color="primary" type="submit">
                                                Entrar
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                   
            </div>

        );
    }


}

export default Login;