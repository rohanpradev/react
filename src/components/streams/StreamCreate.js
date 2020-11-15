import React from 'react';
import { createStream } from '../../actions';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';

const StreamCreate = ({ createStream }) => {
	const handleSubmit = (formValues) => {
		createStream(formValues);
	};

	return (
		<div>
			<h4>Create a Stream:</h4>
			<StreamForm onSubmit={handleSubmit} />
		</div>
	);
};

export default connect(null, { createStream })(StreamCreate);
