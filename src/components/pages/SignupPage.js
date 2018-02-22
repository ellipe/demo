import React from "react";
import PropTypes from "prop-types";
import queryString from 'query-string';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Message, Grid, Header, Card } from "semantic-ui-react";

import SignupForm from "../forms/SignupForm";





class SignupPage extends React.Component {
	state = {
		isLoading: true,
		isRegistered: false,
		errors: {},
		data: {
			fullname: "",
			email_address: "",
			patient_id: "",
			signup_code_used: "",
			gender: ""
		}
	};

	componentDidMount() {
		console.log("Signup mounted!");
		const parsed = queryString.parse(this.props.location.search);
		console.log(parsed)
	}

	submit = data =>
		console.log("submited");

	render() {
		const { data, isLoading, isRegistered } = this.state;
		return (
			<Grid container={true} centered={true}>
				<Grid.Column width={12}>
					<div>SIGNUP</div>
				</Grid.Column>
			</Grid>
		);
	}
}



export default connect(null, {})(SignupPage);
