import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

const StreamList = ({ streams, fetchStreams, currentUserId, isSignedIn }) => {
	useEffect(() => {
		fetchStreams();
	}, [fetchStreams]);

	const renderAdmin = (stream) => {
		if (stream.userid === currentUserId) {
			return (
				<div className='right floated content'>
					<Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
						EDIT
					</Link>
					<Link to={`/streams/delete/${stream.id}`} className='ui button negative'>
						DELETE
					</Link>
				</div>
			);
		}
	};

	const renderCreate = () =>
		isSignedIn ? (
			<div style={{ textAlign: 'right' }}>
				<Link to='streams/new' className='ui button primary'>
					Create Stream
				</Link>
			</div>
		) : null;

	const renderItems = () =>
		streams.map((stream) => (
			<div className='item' key={stream.id}>
				{renderAdmin(stream)}
				<i className='large middle aligned icon camera' />
				<div className='content'>
					<Link to={`/streams/${stream.id}`} className='header'>
						{stream.title}
					</Link>
					<div className='description'>{stream.description}</div>
				</div>
			</div>
		));

	return (
		<>
			<h1>My Streams</h1>
			<div className='ui celled list'>{renderItems()}</div>
			{renderCreate()}
		</>
	);
};

const mapStateToProps = (state) => ({
	streams: Object.values(state.streams),
	currentUserId: state.auth.userid,
	isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);
