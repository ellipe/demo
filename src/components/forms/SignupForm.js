import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Checkbox } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import Validator from "validator";
import isEmpty from 'lodash/isEmpty';






function validateInput(data) {
	let errors = {};

	if (Validator.isEmpty(data.email_address)) {
		errors.email_address = 'Este campo es requerido.';
	}

	if (!Validator.isEmail(data.email_address)) {
		errors.email_address = 'Correo invalido';
	}

	if (Validator.isEmpty(data.username)) {
		errors.username = 'Este campo es requerido.';
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Este campo es requerido.';
	}

	if (Validator.isEmpty(data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Este campo es requerido.';
	}

	if (!Validator.equals(data.password, data.passwordConfirmation)) {
		errors.passwordConfirmation = 'Las contraseñas no son iguales';
	}

	if (!Validator.equals(data.email_address, data.email_address_confirmation)) {
		errors.email_address_confirmation = "Los correos no son iguales";
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
}

class SignupForm extends React.Component {
	state = {
		data: {
			username: "",
			email_address: "",
			email_address_confirmation: "",
			fullname: "",
			signup_code_used:'',
			patient_id: "",
			password: "",
			passwordConfirmation:'',
			gender:"",
			boletin: false,
			donaciones: false,
			remisiones: false,
			habeas_data: false
			
		},
		isLoading: true,
		errors: {},
		agreements: {
			boletin: { name: ''},	
			donaciones: { name: ''},	
			remisiones: { name: ''},	
			habeas_data: { name: ''},	
		},
		showModal: false,
		policy: '',
		policy_header: ''
	};

	

	componentDidMount() {
		this.setState({
			data: { 
					...this.state.data, 
					email_address: this.props.data.email_address, 
					patient_id: this.props.data.patient_id, 
					signup_code_used: this.props.data.signup_code_used, 
					fullname: this.props.data.fullname, 
					gender: this.props.data.gender
				}
		});
	}

	isValid(){
		const {errors, isValid} = validateInput(this.state.data);

		if (!isValid) {
			this.setState({ errors: errors });
		}

		return isValid;
	}

	onSubmit = () => {
		if (this.isValid()) {
			this.setState({ isLoading: true });
			this.props.submit(this.state.data).catch((err) => {
				if (err.response.status >= 500) {
					this.setState({
						errors: {
							global: "No se pudo contactar con el servidor"
						},
						isLoading: false
					});
				} else if (err.response.status === 404) {
					this.setState({
						errors: {
							global: "Ups!, Algo esta mal"
						},
						isLoading: false
					});
				} else {
					this.setState({
						errors: err.response.data.errors,
						isLoading: false
					});
				}
			});
		}
	};

	validate = data => {
		const errors = {};
		// TODO: validate uniqueness.
		if (!data.username) errors.username = "No puede estar en blanco.";
		if (!data.password) errors.password = "No puede estar en blanco.";
		if (!Validator.isEmail(data.email_address)) errors.email_address = "Debe ser un correo válido";
		return errors;
	};

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	}

	_onChangeCheckbox = (e, data) => {
		this.setState({
			data: { ...this.state.data, [data.name]: data.checked }
		});
	};

	_openModal = (policy) => {
		// verify that the data.agreement related to this policy is false
		if (!this.state.data[policy.name]) {
			this.setState({
				showModal: true,
				data: { ...this.state.data, [policy.name]: true },
				policy: policy.policy,
				policy_header: policy.header

			});
		} else {
			this.setState({
				data: { ...this.state.data, [policy.name]: false }
			});
		}
	};

	_closeModal = () => {
		this.setState({
			showModal: false,
			policy: '',
			policy_header: ''
		});
	}

		
	render() {
		const { data, errors, isLoading, agreements, showModal, policy, policy_header} = this.state;
		return (
			<Form onSubmit={this.onSubmit} loading={isLoading}>
				{errors.global && (
					<Message negative>
						<Message.Header>Algo ocurrió</Message.Header>
						<p>{errors.global}</p>
					</Message>
				)}
				<Form.Field error={!!errors.email_address}>
					<label htmlFor="email_address">Correo</label>
					<input
						type="email"
						id="email_address"
						name="email_address"
						value={data.email_address}
						onChange={this.onChange}
					/>
					{errors.email_address && <InlineError text={errors.email_address} />}
				</Form.Field>
				<Form.Field error={!!errors.email_address_confirmation}>
					<label htmlFor="email_address_confirmation">Confirmar Correo</label>
					<input
						type="email"
						id="email_address_confirmation"
						name="email_address_confirmation"
						value={data.email_address_confirmation}
						onChange={this.onChange}
					/>
					{errors.email_address_confirmation && <InlineError text={errors.email_address_confirmation} />}
				</Form.Field>
				<Form.Field error={!!errors.username}>
					<label htmlFor="username">Usuario</label>
					<input
						type="text"
						id="username"
						name="username"
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
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InlineError text={errors.password} />}
				</Form.Field>
				<Form.Field error={!!errors.passwordConfirmation}>
					<label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
					<input
						type="password"
						id="passwordConfirmation"
						name="passwordConfirmation"
						value={data.passwordConfirmation}
						onChange={this.onChange}
					/>
					{errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
				</Form.Field>
				<Form.Field>
					<Checkbox
						name="boletin"
						id="boletin" 
						label={agreements.boletin.short_message} 
						onChange={this._onChangeCheckbox}
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox 
						label={agreements.donaciones.short_message}
						onChange={this._onChangeCheckbox}
						name='donaciones'
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox 
						label={agreements.remisiones.short_message}
						name='remisiones'
						onChange={this._onChangeCheckbox} 
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox 
						label={agreements.habeas_data.short_message}
						name='habeas_data'
						onChange={() => this._openModal(agreements.habeas_data)}

					/>
				</Form.Field>
				<Button disabled={!data.habeas_data} primary>
					Registrarse
				</Button>
			</Form>
		);
	}
}

SignupForm.propTypes = {
	submit: PropTypes.func.isRequired,
	data: PropTypes.shape({
		email_address: PropTypes.string.isRequired,
		signup_code_used: PropTypes.string.isRequired,
		patient_id: PropTypes.string.isRequired,
		fullname: PropTypes.string
	})
};

export default SignupForm;
