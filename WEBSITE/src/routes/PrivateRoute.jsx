import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../services/auth";
import Loader from "../layouts/Loader.jsx";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loading: true,
            isAuthenticated: false,
            user: null,
            errorCode: null
        }
    }

    componentDidMount() {

        console.log("private route");

        var _class = this;

        Auth.isAuthenticated()
            .then(function (response) {
                console.log(response)

                _class.setState({
                    loading: false,
                    isAuthenticated: response.authenticated,
                    user: response.user
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
            msg = this.state.isAuthenticated ? "Autenticando..." : "Redirecionando...";
            
        if (state.loading) {
            return <Loader msg={msg} />;
        } else {
            return (
                <Route
                    {...rest}
                    render={props =>
                        state.isAuthenticated ? (
                            <Component {...props} user={this.state.user} />
                        ) :
                            (
                                <Redirect to={{ pathname: '/login', state: { from: this.props.location, errorCode: state.errorCode } }} />
                            )
                    }
                />
            )
        }        
    }
}

export default PrivateRoute;