import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from 'query-string';
import {Link, withRouter} from 'react-router-dom';
import LoginForm from "../forms/LoginForm";

// Semantic UI Components
import { Grid, Card, Message } from "semantic-ui-react";

class LoginPage extends React.Component {

  componentDidMount() {
    console.log("Login Mounted");
    const parsed = queryString.parse(this.props.location.search);
    console.log(parsed)
  }


  submit = data =>
    this.props.login(data).then((user) => {
      this.props.history.push("/")
    });

  render() {
    return (
      <Grid container={true} centered={true}>
        <Grid.Column width={12}>
          <Card fluid={true}>
            <Card.Content>
              <LoginForm submit={this.submit} />
            </Card.Content>
            <Message attached='bottom' warning>
              <Link to='/forgot_password'>¿ Olvidaste tu contraseña ?</Link>
            </Message>
          </Card>
        </Grid.Column>
      </Grid>
      );
  }
}



export default connect(null, {  })(LoginPage);
