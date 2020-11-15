import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import clientId from '../../client';
import { signIn, signOut } from '../../actions';

let authInstance;

const GoogleAuth = ({ auth, signIn, signOut }) => {
	const onAuthChange = (isSignedIn) => {
		isSignedIn ? signIn(authInstance.currentUser.get().getId()) : signOut();
	};

	const onSignInClick = () => {
		authInstance.signIn();
	};

	const onSignOutClick = () => {
		authInstance.signOut();
	};

	useEffect(() => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({ clientId, scope: 'email' }).then(() => {
				authInstance = window.gapi.auth2.getAuthInstance();
				onAuthChange(authInstance.isSignedIn.get());
				authInstance.isSignedIn.listen(onAuthChange);
			});
		});
	});

	const renderItem = () => {
		if (auth === null) return null;
		else if (auth) {
			return (
				<button className='ui red google button' onClick={onSignOutClick}>
					<i className='google icon' />
					Sign Out
				</button>
			);
		} else {
			return (
				<button className='ui blue google button' onClick={onSignInClick}>
					<i className='google icon' />
					Sign In
				</button>
			);
		}
	};

	return <div>{renderItem()}</div>;
};

const mapStateToProps = (state) => ({ auth: state.auth.isSignedIn });

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
