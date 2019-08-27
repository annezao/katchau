import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services/auth";
import Login from "../layouts/Login.jsx";
import Loader from "../layouts/Loader.jsx";

class PublicRoute extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            isAuthenticated: false,
            errorCode: null
        }
    }

    componentDidMount() {

        console.log("public route");

        var _class = this;

        Auth.isAuthenticated()
            .then(function(response){
                console.log(response)

                _class.setState({
                    loading: false,
                    isAuthenticated: response.authenticated
                }); 
            })
            .catch(function (response) {
                console.log(response)

                _class.setState({
                    loading: false,
                    isAuthenticated: response.authenticated,
                    errorCode: response.errorCode
                }); 
            }); 
    }

    render() { 
        const { component: Component, ...rest } = this.props,
            state = this.state,
            msg = this.state.isAuthenticated ? "Redirecionando..." : "Autenticando...";

        if (state.loading) {
            return <Loader msg={msg} />;
        } else {
            return (
                <Route
                    {...rest}
                    render={props =>
                        state.isAuthenticated ? (
                            <Redirect to={{ pathname: "/admin/devices" }} />
                        ) :
                            (
                                props.location.pathname.includes("login") ?
                                    (
                                        <Login {...props} errorCode={state.errorCode} />
                                    )
                                    :
                                    (
                                        <Redirect to={{ pathname: '/login', state: { from: props.location, errorCode: state.errorCode } }} />
                                    )
                            )
                    }
                />
            )
        }           
    }
}

export default PublicRoute;