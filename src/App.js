import React from "react";
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage" 
import DashboardPage from "./components/pages/DashboardPage" 


const App = ({ location }) => (
    <Grid style={{ marginLeft: "0rem", marginRight: "0rem" }}>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <Switch>
            <Route
              location={location}
              path="/signup"
              exact
              component={SignupPage}
            />
            <Route
              location={location}
              path="/"
              exact
              component={DashboardPage}
            />
            <Route 
              path="/login"
              location={location} 
              component={LoginPage} 
            />
          </Switch>
        </Grid.Column>
      </Grid.Row>
    </Grid>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
