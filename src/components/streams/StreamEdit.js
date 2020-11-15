import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

const StreamEdit = (props) => {
	const id = props.match.params.id;
	const { fetchStream, editStream, stream } = props;

	useEffect(() => {
		fetchStream(id);
	}, [fetchStream, id]);

	const handleSubmit = (formValues) => {
		editStream(id, formValues);
	};

	return (
		<div>
			<h4>Edit a Stream:</h4>
			<StreamForm initialValues={_.pick(stream, 'title', 'description')} onSubmit={handleSubmit} />
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	return { stream: state.streams[id] };
};

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);
