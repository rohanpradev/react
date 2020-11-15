import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StreamDelete = (props) => {
	const [toggle, setToggle] = useState(false);
	const id = props.match.params.id;
	const { fetchStream, deleteStream, stream } = props;

	useEffect(() => {
		fetchStream(id);
	}, [id, fetchStream]);

	const handleDelete = () => deleteStream(id);

	const action = (
		<>
			<Link to='/' className='ui button'>
				Cancel
			</Link>
			<button onClick={handleDelete} className='ui button primary'>
				Delete
			</button>
		</>
	);

	const onDismiss = () => history.push('/');

	const content = (
		<>
			Are you sure you want to delete?
			<div>
				{!toggle ? (
					<b style={{ cursor: 'pointer' }} onClick={() => setToggle(!toggle)}>
						Show more...
					</b>
				) : (
					<>
						<div
							style={{
								marginTop: '10px',
								padding: '10px',
								backgroundColor: '#eeeeee',
								border: '1px solid gainsboro',
								borderRadius: '5px',
							}}
						>
							{stream ? (
								<>
									<p>Title: {stream.title}</p>
									<p>Description: {stream.description}</p>
								</>
							) : null}

							<b style={{ cursor: 'pointer' }} onClick={() => setToggle(!toggle)}>
								Show Less...
							</b>
						</div>
					</>
				)}
			</div>
		</>
	);

	return <Modal title='Delete stream' content={content} action={action} onDismiss={onDismiss} />;
};

const mapStateToprops = (state, ownProps) => ({ stream: state.streams[ownProps.match.params.id] });

export default connect(mapStateToprops, { fetchStream, deleteStream })(StreamDelete);
