import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "../routes/PublicRoute.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";

import AdminLayout from "../layouts/Admin/Admin.jsx";

class App extends React.Component {

  render() {
      return (
          <Switch> 
              <PrivateRoute path="/admin" component={AdminLayout} />
              <PublicRoute component={AdminLayout} />
          </Switch>
    );
  }
}

export default App;

