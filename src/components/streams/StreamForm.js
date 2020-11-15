import React from 'react';
import { reduxForm, Field } from 'redux-form';

const StreamForm = (props) => {
	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
		props.reset();
	};

	return (
		<form className='ui form error' onSubmit={props.handleSubmit(onSubmit)}>
			<Field name='title' label='Title' component={input} />
			<Field name='description' label='Description' component={input} />
			<button className='ui primary button'>Save</button>
		</form>
	);
};

const input = ({ label, input, meta }) => {
	const className = meta.error && meta.touched ? 'error' : null;
	return (
		<div className={`field ${className}`}>
			<label>{label}</label>
			<input autoComplete='off' {...input} />
			{renderError(meta)}
		</div>
	);
};

const renderError = ({ error, touched }) =>
	error && touched ? (
		<div className='ui error message'>
			<div className='header'>{error}</div>
		</div>
	) : null;

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) errors.title = 'Please provide a Title';
	if (!formValues.description) errors.description = 'Please provide a Description';
	return errors;
};

export default reduxForm({ form: 'StreamForm', validate })(StreamForm);
