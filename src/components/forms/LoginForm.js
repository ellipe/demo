import React from "react";
import PropTypes from "prop-types";
import InlineError from "../messages/InlineError";
import isEmpty from "lodash/isEmpty";

// Semantic UI Components
import { Form, Button, Message, Icon } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    data: {
      username: "",
      password: ""
    },
    isLoading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log(this.props.submit);
  };

  validate = data => {
    const errors = {};
    if (!data.username) errors.username = "No puede estar en blanco";
    if (!data.password) errors.password = "No puede estar en blanco";
    return errors;
  };

  render() {
    const { data, errors, isLoading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={isLoading}>
        {errors.global && (
          <Message icon negative>
            <Icon name="lock" />
            <Message.Content>
              <Message.Header>{errors.global}</Message.Header>
              <p>Por favor, intenta nuevamente.</p>
            </Message.Content>
          </Message>
        )}
        <Form.Field error={!!errors.username}>
          <label htmlFor="username">Usuario / Documento</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Digita tu usuario o documento de identidad"
            value={data.username}
            onChange={this.onChange}
          />
          {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Digita tu contraseña"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary content="Ingresar" icon="sign in" labelPosition="left" />
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
